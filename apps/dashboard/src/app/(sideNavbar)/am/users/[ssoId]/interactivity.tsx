'use client';

import { ActionIcon, Loader, Menu, MenuDropdown, MenuItem, MenuLabel, MenuTarget, rem, Text } from '@mantine/core';
import { IconDots, IconId, IconKarate } from '@tabler/icons-react';
import { startTransition, useActionState } from 'react';

import { adminRemoveFromTeam } from '@/actions/user';
import { openConfirmModal } from '@mantine/modals';
import { showNotification } from '@mantine/notifications';
import { User } from '@repo/db';

export function BuildTeamMenu(props: { team: { slug: string; name: string }; ssoId: string }) {
	const [curentState, removeFromTeamAction, isLoading] = useActionState(adminRemoveFromTeam, {});

	return (
		<Menu key={props.team.slug} position="bottom-end">
			<MenuTarget>
				<ActionIcon size="sm" variant="subtle" color="gray" aria-label="More Actions">
					<IconDots size={16} />
				</ActionIcon>
			</MenuTarget>
			<MenuDropdown>
				<MenuItem
					leftSection={isLoading ? <Loader color="red" /> : <IconKarate style={{ width: rem(14), height: rem(14) }} />}
					color="red"
					aria-label="Remove from this Team"
					rel="noopener"
					onClick={() => {
						openConfirmModal({
							title: 'Confirm Action',
							centered: true,
							confirmProps: { color: 'red' },
							children: (
								<Text size="sm">
									Are you sure you want to perform this action? This action is irreversible and will cause heavy data
									mutations.
								</Text>
							),
							labels: { confirm: 'Confirm', cancel: 'Cancel' },
							onConfirm: async () => {
								if (!props.team.slug || !props.ssoId) return;

								await new Promise<void>((resolve) => {
									startTransition(() => {
										removeFromTeamAction({ slug: props.team.slug, ssoId: props.ssoId });
										resolve();
									});
								});

								showNotification({
									title: 'Success',
									message: `Successfully removed ${props.ssoId} from ${props.team.name}`,
									color: 'green',
								});
							},
						});
					}}
				>
					Remove from Team
				</MenuItem>
			</MenuDropdown>
		</Menu>
	);
}

export function UserMenu({ user }: { user: User }) {
	return (
		<Menu>
			<MenuTarget>
				<ActionIcon size="lg" variant="subtle" color="gray" aria-label="More Actions">
					<IconDots style={{ width: '70%', height: '70%' }} stroke={1.5} />
				</ActionIcon>
			</MenuTarget>
			<MenuDropdown>
				<MenuLabel>Sessions</MenuLabel>
				<MenuItem>Close session...</MenuItem>
				<MenuItem>Close all sessions</MenuItem>
				<MenuLabel>Teams</MenuLabel>
				<MenuItem>Add to team...</MenuItem>
				<MenuItem>Remove from team...</MenuItem>
				<MenuItem>Remove from all teams</MenuItem>
				<MenuLabel>Applications</MenuLabel>
				<MenuItem>Delete application...</MenuItem>
				<MenuItem>Delete all applications</MenuItem>
				<MenuLabel>Permissions</MenuLabel>
				<MenuItem>Add permission...</MenuItem>
				<MenuItem>Remove permission...</MenuItem>
				<MenuLabel>Claims</MenuLabel>
				<MenuItem>Remove from claim...</MenuItem>
				<MenuItem>Remove from all claims</MenuItem>
				<MenuLabel>Other</MenuLabel>
				<MenuItem>Send message/notification</MenuItem>
				<MenuItem>View/clear consents</MenuItem>
				<MenuItem
					leftSection={<IconId style={{ width: rem(14), height: rem(14) }} />}
					aria-label="Copy ID"
					onClick={() => window.navigator.clipboard.writeText(user.id)}
				>
					Copy ID
				</MenuItem>
				<MenuItem
					leftSection={<IconId style={{ width: rem(14), height: rem(14) }} />}
					aria-label="Copy SSO ID"
					onClick={() => window.navigator.clipboard.writeText(user.ssoId)}
				>
					Copy SSO ID
				</MenuItem>
			</MenuDropdown>
			{/* <MenuDropdown>
								<MenuLabel>Message</MenuLabel>
								<MenuItem
									leftSection={<IconMessage2 style={{ width: rem(14), height: rem(14) }} />}
									aria-label="Send Bot Message"
									component={Link}
									href={`/am/bot/msg?user=${websiteData?.discordId}`}
									rel="noopener"
									disabled={!websiteData?.discordId}
								>
									Send via Bot
								</MenuItem>
								<MenuItem
									leftSection={<IconBrandDiscord style={{ width: rem(14), height: rem(14) }} />}
									component={Link}
									target="_blank"
									href={`https://discord.com/channels/@me/${websiteData.discordId}`}
								>
									Open DMs
								</MenuItem>
								<MenuItem
									leftSection={<IconMail style={{ width: rem(14), height: rem(14) }} />}
									component={Link}
									target="_blank"
									href={`mailto:${keycloakData?.email}`}
									disabled={!keycloakData?.email}
								>
									Send Email
								</MenuItem>
							</MenuDropdown> */}
		</Menu>
	);
}
