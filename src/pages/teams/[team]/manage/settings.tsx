import {
	Alert,
	Button,
	Divider,
	Grid,
	Group,
	Input,
	Select,
	Switch,
	Text,
	TextInput,
	Textarea,
	Tooltip,
	useMantineColorScheme,
	useMantineTheme,
} from '@mantine/core';
import { IconAlertCircle, IconCheck, IconPlus, IconTrash } from '@tabler/icons-react';
import { useEffect, useState } from 'react';

import Page from '../../../../components/Page';
import RTE from '../../../../components/RTE';
import SettingsTabs from '../../../../components/SettingsTabs';
import fetcher from '../../../../utils/Fetcher';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { showNotification } from '@mantine/notifications';
import { useUser } from '../../../../hooks/useUser';
import { v4 as uuidv4 } from 'uuid';

const Settings = ({ data: tempData }: any) => {
	const theme = useMantineTheme();
	const scheme = useMantineColorScheme();
	const user = useUser();
	const [data, setData] = useState(tempData);
	const [allowSocial, setAllowSocial] = useState(false);
	const [allowSettings, setAllowSettings] = useState(false);

	useEffect(() => {
		if (!user.isLoading) {
			setAllowSettings(user.hasPermission('team.settings.edit'));
			setAllowSocial(user.hasPermission('team.socials.edit'));
		}
	}, [user]);

	const handleSave = (e: any) => {
		e.preventDefault();
		const uploadingData = { ...data, socials: undefined, _count: undefined };
		fetch(process.env.NEXT_PUBLIC_API_URL + `/buildteams/${uploadingData.id}`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
				Authorization: 'Bearer ' + user.token,
			},
			body: JSON.stringify(uploadingData),
		})
			.then((res) => res.json())
			.then((res) => {
				if (res.errors) {
					showNotification({
						title: 'Update failed',
						message: res.error,
						color: 'red',
					});
				} else {
					showNotification({
						title: 'Settings updated',
						message: 'All Data has been saved',
						color: 'green',
						icon: <IconCheck />,
					});
					setData({ ...data, ...res });
				}
			});
	};
	const handleSaveSocials = (e: any) => {
		e.preventDefault();
		fetch(process.env.NEXT_PUBLIC_API_URL + `/buildteams/${data.id}/socials`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
				Authorization: 'Bearer ' + user.token,
			},
			body: JSON.stringify({ socials: data.socials }),
		})
			.then((res) => res.json())
			.then((res) => {
				if (res.errors) {
					showNotification({
						title: 'Update failed',
						message: res.error,
						color: 'red',
					});
				} else {
					showNotification({
						title: 'Socials updated',
						message: 'All Data has been saved',
						color: 'green',
						icon: <IconCheck />,
					});
					// setData({ ...data, ...res });
				}
			});
	};

	const handleUpdate = (id: string, d: any) => {
		const updatedData = { ...data };
		updatedData[id] = d;
		setData(updatedData);
	};
	const handleAddSocial = (d: any) => {
		const updatedSocial = [...data.socials, d];

		setData({ ...data, socials: updatedSocial });
	};
	const handleDeleteSocial = (id: string) => {
		const updatedSocial = data.socials.filter((d: any) => d.id !== id);
		setData({ ...data, socials: updatedSocial });
	};
	const handleUpdateSocial = (i: number, id: string, d: any) => {
		const updatedData = { ...data };
		updatedData.socials[i][id] = d;

		setData(updatedData);
	};
	const handleGenerateToken = () => {
		fetch(process.env.NEXT_PUBLIC_API_URL + `/buildteams/${data.slug}/token?slug=true`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
				Authorization: 'Bearer ' + user.token,
			},
		})
			.then((res) => res.json())
			.then((res) => {
				if (res.code) {
					showNotification({
						title: 'Update failed',
						message: res.message,
						color: 'red',
					});
				} else {
					showNotification({
						title: 'Settings updated',
						message: res.message,
						color: 'green',
						icon: <IconCheck />,
					});
				}
			});
	};

	return (
		<Page
			smallPadding
			head={{
				title: 'Settings',
				image: 'https://cdn.buildtheearth.net/static/thumbnails/teams.png',
			}}
			seo={{ nofollow: true, noindex: true }}
			requiredPermissions={[
				'team.settings.edit',
				'team.socials.edit',
				'team.application.edit',
				'team.application.list',
				'team.application.review',
			]}
			loading={!data}
		>
			<SettingsTabs team={data?.id} loading={!data}>
				{data && (
					<>
						<form onSubmit={handleSave}>
							<h3>Branding</h3>
							<Grid grow>
								<Grid.Col span={{ md: 6 }}>
									<TextInput
										required
										label="BuildTeam Name"
										description="The name that should be displayed on the Build Team List. Use the short form `BTE` if possible."
										mb="md"
										defaultValue={data.name}
										disabled={!allowSettings}
										onChange={(e) => handleUpdate('name', e.target.value)}
									/>
									<TextInput
										required
										label="Logo URL"
										description="The logo that should be displayed on the Build Team List."
										mb="md"
										defaultValue={data.icon}
										disabled={!allowSettings}
										onChange={(e) => handleUpdate('icon', e.target.value)}
									/>
									<TextInput
										required
										label="Locations"
										description="A comma seperated list of 2-letter-ISO-codes that the Build Team is building in. If its a global Build Team this should be set to `glb`"
										mb="md"
										defaultValue={data.location}
										disabled={!allowSettings}
										onChange={(e) => handleUpdate('location', e.target.value)}
									/>
								</Grid.Col>
								<Grid.Col span={{ md: 6 }}>
									<TextInput
										required
										label="Build Team Slug"
										description="A short form of the Build Team name that can be used in the URL. Use the countrie´s two-letter code if possible."
										defaultValue={data.slug}
										disabled={!allowSettings}
										onChange={(e) => handleUpdate('slug', e.target.value)}
									/>
									<TextInput
										required
										label="Background Image URL"
										description="The background image that should be displayed on the Build Team Page."
										mt="md"
										defaultValue={data.backgroundImage}
										disabled={!allowSettings}
										onChange={(e) => handleUpdate('backgroundImage', e.target.value)}
									/>

									<TextInput
										required
										label="Minecraft IP"
										description="Either your actual IP people have to enter ingame, or, if you are on the network, `buildtheearth.net` - The website will then use your slug to generate the /bt command."
										defaultValue={data.ip}
										disabled={!allowSettings}
										mt="md"
										onChange={(e) => handleUpdate('ip', e.target.value)}
									/>
								</Grid.Col>
							</Grid>
							<Input.Wrapper
								label="About"
								description="The about section on the Build Team Page."
								mb="md"
							>
								<RTE
									style={{
										root: {
											marginTop: '5px',
										},
										content: {
											backgroundColor:
												scheme.colorScheme === 'dark' ? theme.colors.dark[6] : theme.colors.gray[0],
										},
										toolbar: {
											backgroundColor:
												scheme.colorScheme === 'dark' ? theme.colors.dark[6] : theme.colors.gray[0],
										},
									}}
									value={data.about}
									onChange={(e) => allowSettings && handleUpdate('about', e)}
								/>
							</Input.Wrapper>
							<TextInput
								required
								label="Discord Invite"
								description="A discord.gg link of your discord server. This link is displayed as a social link."
								defaultValue={data.invite}
								disabled={!allowSettings}
								onChange={(e) => handleUpdate('invite', e.target.value)}
								mb="xl"
							/>
							<h3>Applications and Claims</h3>
							<Switch
								label="Trial Applications"
								description="If new Users should be able to apply as Trial to the Build Team and then build their builder application builds on the Build Team´s server."
								defaultChecked={data.allowTrial}
								disabled={!allowSettings}
								onChange={(e) => handleUpdate('allowTrial', e.target.checked)}
							/>
							<Switch
								label="Builder Claims"
								description="If Builder schould be able to create Claims on the Map by themselves. If this option is disabled you can only create claims with the API."
								defaultChecked={data.allowBuilderClaim}
								mt="md"
								disabled={!allowSettings}
								onChange={(e) => handleUpdate('allowBuilderClaim', e.target.checked)}
							/>
							<Switch
								label="Instant accept Applications"
								description="If new Applications should directly be accepted without the need to review them."
								defaultChecked={data.instantAccept}
								mt="md"
								mb="xl"
								disabled={!allowSettings}
								onChange={(e) => handleUpdate('instantAccept', e.target.checked)}
							/>
							<h3>Messages</h3>
							<Text size="sm" mb="md">
								All Messages support full Discord Markdown syntax. Additionally you can use these
								dynamic values in the Messages:{' '}
								<Text c="teal" span>
									{'{user}'} {'{team}'} {'{url}'} {'{reason}'} {'{reviewedAt}'} {'{createdAt}'}{' '}
									{'{id}'}
								</Text>
								. Leaving the Textfield empty will not send any Message to the User.
							</Text>
							<Grid grow mb="md">
								<Grid.Col span={{ md: 6 }}>
									<Textarea
										label="Acception Message"
										description="The Message the Discord Bot should send Users if they get accepted as Builders."
										defaultValue={data.acceptionMessage}
										minRows={9}
										disabled={!allowSettings}
										onChange={(e) => handleUpdate('acceptionMessage', e.target.value)}
									/>
								</Grid.Col>
								<Grid.Col span={{ md: 6 }}>
									<Textarea
										label="Rejection Message"
										description="The Message the Discord Bot should send Users if they get Rejected."
										defaultValue={data.rejectionMessage}
										minRows={9}
										disabled={!allowSettings}
										onChange={(e) => handleUpdate('rejectionMessage', e.target.value)}
									/>
								</Grid.Col>
							</Grid>
							<Textarea
								label="Trial Acception Message"
								mb="md"
								disabled={!allowSettings || !data.allowTrial}
								description="The Message the Discord Bot should send Users if they get accepted as Trials."
								defaultValue={data.trialMessage}
								placeholder={!data.allowTrial ? 'Trial Applications disabled' : undefined}
								minRows={9}
								style={{ maxWidth: '49.5%' }}
								onChange={(e) => handleUpdate('trialMessage', e.target.value)}
							/>
							<Button type="submit" disabled={!allowSettings}>
								Save
							</Button>
							<Tooltip label="Generating a new API Token will invalidate the current active token!">
								<Button onClick={handleGenerateToken} variant="outline" ml="md">
									Generate API Token
								</Button>
							</Tooltip>
						</form>
						<Group justify={'space-between'} mt="xl">
							<h3>Socials</h3>
							<Button
								leftSection={<IconPlus />}
								mb="md"
								onClick={() => handleAddSocial({ id: uuidv4(), buildTeamId: data.id })}
								disabled={!allowSocial}
							>
								Add Social Link
							</Button>
						</Group>
						<form onSubmit={handleSave}>
							{data.socials.map((social: any, i: number) => (
								<Group
									grow
									key={social.id}
									mb="md"
									style={{ alignItems: 'flex-end', display: 'flex' }}
								>
									<Select
										required
										label="Type"
										placeholder="Select Type"
										searchable
										nothingFoundMessage="No Types Found"
										data={[
											{ value: 'reddit', label: 'Reddit' },
											{ value: 'twitter', label: 'Twitter' },
											{ value: 'instagram', label: 'Instagram' },
											{ value: 'youtube', label: 'Youtube' },
											{ value: 'twitch', label: 'Twitch' },
											{ value: 'tiktok', label: 'TikTok' },
											{ value: 'website', label: 'Website' },
										]}
										defaultValue={social.icon}
										disabled={!allowSocial}
										onChange={(e) => {
											handleUpdateSocial(i, 'icon', e);
											handleUpdateSocial(i, 'name', e);
										}}
									/>
									<TextInput
										required
										label="URL"
										defaultValue={social.url}
										disabled={!allowSocial}
										onChange={(e) => handleUpdateSocial(i, 'url', e.target.value)}
									/>
									{/* <Button
										variant="outline"
										style={{ width: '80%' }}
										leftSection={<IconTrash />}
										disabled={!allowSocial}
										onClick={() => handleDeleteSocial(social.id)}
									>
										Delete
									</Button> */}
								</Group>
							))}
							<br />
							<Button type="submit" disabled={!allowSocial} onClick={handleSaveSocials}>
								Save
							</Button>
						</form>
					</>
				)}
			</SettingsTabs>
		</Page>
	);
};

export default Settings;
export async function getStaticProps({ locale, params }: any) {
	const res = await fetcher(`/buildteams/${params.team}?slug=true`);
	return {
		props: {
			...(await serverSideTranslations(locale, ['common', 'teams'])),
			data: res,
		},
	};
}

export async function getStaticPaths() {
	const res = await fetcher('/buildteams');
	return {
		paths: res.map((team: any) => ({
			params: {
				team: team.slug,
			},
		})),
		fallback: true,
	};
}
