import { Alert, Button, SegmentedControl, Skeleton, useMantineTheme } from '@mantine/core';
import { IconAlertCircle, IconCheck } from '@tabler/icons';

import { ApplicationQuestions } from '../../../utils/application/ApplicationQuestions';
import CheckboxQuestion from '../../../components/application/questions/CheckboxQuestion';
import { NextPage } from 'next';
import Page from '../../../components/Page';
import fetcher from '../../../utils/Fetcher';
import sanitize from 'sanitize-html';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { showNotification } from '@mantine/notifications';
import { useForm } from '@mantine/form';
import { useRouter } from 'next/router';
import useSWR from 'swr';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useUser } from '../../../hooks/useUser';

const Apply: NextPage = ({ data }: any) => {
	const router = useRouter();
	const team = router.query.team;
	const theme = useMantineTheme();
	const user = useUser();
	const { t } = useTranslation('teams');
	const [loading, setLoading] = useState(false);
	const { data: buildteam } = useSWR(`/buildteams/${team}`);
	// const { data } = useSWR(`/buildteams/${team}/application/questions`);
	const [trial, setTrial] = useState(false);
	const form = useForm({
		validate: generateValidation(data?.filter((d: any) => d.trial == trial)),
	});

	const handleSubmit = (e: any) => {
		setLoading(true);
		fetch(process.env.NEXT_PUBLIC_API_URL + `/buildteams/${team}/apply${trial ? '?trial=true' : ''}`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
				Authorization: 'Bearer ' + user.token,
			},
			body: JSON.stringify(e),
		})
			.then((res) => res.json())
			.then((res) => {
				if (res.errors || res.message) {
					showNotification({
						title: 'Application failed',
						message: res.message,
						color: 'red',
					});
					setLoading(false);
				} else {
					showNotification({
						title: 'Application sent',
						message: 'Your Application will be reviewed shortly',
						color: 'green',
						icon: <IconCheck />,
					});
					setLoading(false);
				}
			});
	};

	return (
		<Page
			head={{
				title: t('apply.title', { team: buildteam?.name || 'BTE' }),
				image: 'https://cdn.buildtheearth.net/static/thumbnails/apply.png',
			}}
			title={buildteam?.name}
			description={buildteam?.about}
		>
			{!(data && buildteam)
				? new Array(6).fill(0).map((_, idx) => {
						return <Skeleton height={50} my={'md'} key={idx} />;
				  })
				: !data?.errors && (
						<form onSubmit={form.onSubmit(handleSubmit)}>
							<div dangerouslySetInnerHTML={{ __html: sanitize(buildteam?.about) }} />
							{buildteam?.allowTrial && (
								<>
									<Alert mb="md" icon={<IconAlertCircle size="1rem" />} title={t('apply.trial.title')}>
										{t('apply.trial.description')}
									</Alert>
									<SegmentedControl
										onChange={(value) => {
											setTrial(value === '1');
										}}
										color="blue"
										mb="md"
										styles={{ label: { minWidth: 100 } }}
										disabled={loading}
										data={[
											{ label: t('builder', { ns: 'common' }), value: '0' },
											{ label: t('trial', { ns: 'common' }), value: '1' },
										]}
									/>
								</>
							)}
							{data
								?.filter((d: any) => d.trial == trial)
								.map((d: any, i: number) => {
									const Question = ApplicationQuestions[d.type];
									return <Question key={d.id} {...d} style={{ marginTop: i > 0 && theme.spacing.md, maxWidth: '55%' }} onChange={(v: any) => form.setFieldValue(d.id, v)} error={form.errors[d.id]} disabled={loading} />;
								})}
							<Button type="submit" variant="filled" color="blue" mt="md" loading={loading}>
								{t('button.apply', { ns: 'common' })}
							</Button>
							<Button variant="outline" color="blue" ml="md" mt="md" onClick={() => router.back()} disabled={loading}>
								{t('button.cancel', { ns: 'common' })}
							</Button>
						</form>
				  )}
		</Page>
	);
};
export default Apply;
export async function getStaticProps({ locale, params }: any) {
	const res = await fetcher(`/buildteams/${params.team}/application/questions`);
	return {
		props: {
			data: res,
			...(await serverSideTranslations(locale, ['common', 'teams'])),
		},
	};
}
export async function getStaticPaths() {
	return {
		paths: [],
		fallback: true,
	};
}

function generateValidation(data: any[]) {
	let val: any = {};
	data?.forEach((d) => {
		if (d.type.toLowerCase() != 'text') {
			val[d.id] = (v: any) => (v != null && v != undefined ? ApplicationQuestions[d.type].validation(d)(v) : d.required ? 'Required' : undefined);
		}
	});
	return val;
}