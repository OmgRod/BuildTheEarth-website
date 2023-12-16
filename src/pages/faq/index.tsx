import { Accordion, Button, Flex } from '@mantine/core';

import { IconEdit } from '@tabler/icons';
import { NextPage } from 'next';
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { useRouter } from 'next/router';
import { useState } from 'react';
import sanitizeHtml from 'sanitize-html';
import Page from '../../components/Page';
import SearchInput from '../../components/SearchInput';
import { useIsClient } from '../../hooks/useIsClient';
import { useUser } from '../../hooks/useUser';
import fetcher from '../../utils/Fetcher';

const Faq: NextPage = ({ data }: any) => {
	const router = useRouter();
	const [search, setSearch] = useState('');
	const { t } = useTranslation('faq');
	const user = useUser();
	const isClient = useIsClient();

	return (
		<Page
			head={{
				title: t('head.title'),
				image: 'https://cdn.buildtheearth.net/static/thumbnails/faq.png',
			}}
			title="FAQ"
			description="Answers to all frrequently asked Questions about the BuildTheEarth Project"
		>
			<Flex justify="flex-end" align="center" direction="row" mb="md">
				<SearchInput onSearch={(search) => setSearch(search)} />
				{(user.hasPermission('faq.add') ||
					user.hasPermission('faq.edit') ||
					user.hasPermission('faq.remove')) && (
					<Button leftSection={<IconEdit />} onClick={() => router.push('faq/manage')} ml="md">
						{t('edit')}
					</Button>
				)}
			</Flex>
			<Accordion variant="separated">
				{data
					?.filter((element: any) => element.question.toLowerCase().includes(search.toLowerCase()))
					.map((element: any) => (
						<Accordion.Item value={element.id} key={element.id}>
							<Accordion.Control>{element.question}</Accordion.Control>
							<Accordion.Panel>
								<div
									dangerouslySetInnerHTML={{ __html: isClient ? sanitizeHtml(element.answer) : '' }}
								/>
							</Accordion.Panel>
						</Accordion.Item>
					))}
			</Accordion>
		</Page>
	);
};

export default Faq;

export async function getStaticProps({ locale }: any) {
	const res = await fetcher('/faq');
	return { props: { data: res, ...(await serverSideTranslations(locale, ['common', 'faq'])) } };
}
