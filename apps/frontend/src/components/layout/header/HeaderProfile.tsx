'use client';

import {
	Avatar,
	Button,
	Menu,
	MenuDropdown,
	MenuItem,
	MenuTarget,
	Skeleton,
	useMantineColorScheme,
} from '@mantine/core';
import {
	IconChevronDown,
	IconChevronRight,
	IconLogout,
	IconMap,
	IconMoonStars,
	IconSettings,
	IconSun,
	IconWorld,
} from '@tabler/icons-react';
import { signOut, useSession } from 'next-auth/react';

import Link from 'next/link';

export default function HeaderProfile({
	className,
	avatarClassName,
}: {
	className?: string;
	avatarClassName?: string;
}) {
	const { colorScheme, toggleColorScheme } = useMantineColorScheme();
	const session = useSession();

	if (session.status === 'loading')
		return (
			<Skeleton width={150}>
				<Button
					variant="transparent"
					color="gray"
					leftSection={
						<Avatar color="initials" name={'-'} size="sm" className={avatarClassName} variant="filled">
							-
						</Avatar>
					}
					rightSection={<IconChevronDown size={12} />}
					className={className}
				>
					-.-.-.-.-.
				</Button>
			</Skeleton>
		);
	if (session.status === 'unauthenticated')
		return (
			<Button variant="filled" color="buildtheearth" rightSection={<IconChevronRight size={12} />}>
				Get Started
			</Button>
		);
	if (!session.data) return null;

	return (
		<Menu>
			<MenuTarget>
				<Button
					variant="transparent"
					color="gray"
					leftSection={
						<Avatar
							color="initials"
							name={session.data.user.username}
							size="sm"
							className={avatarClassName}
							variant="filled"
						>
							{session.data.user.username[0].toUpperCase()}
						</Avatar>
					}
					rightSection={<IconChevronDown size={12} />}
					className={className}
				>
					{session.data.user.username}
				</Button>
			</MenuTarget>
			<MenuDropdown style={{ zIndex: 1000 }}>
				<MenuItem component={Link} href="https://buildtheearth.net" leftSection={<IconWorld size={14} />}>
					BuildTheEarth
				</MenuItem>
				<Menu.Item component={Link} href="https://buildtheearth.net/map/edit" leftSection={<IconMap size={14} />}>
					Claim Map
				</Menu.Item>
				<Menu.Item component={Link} href="/settings" leftSection={<IconSettings size={14} />}>
					Settings
				</Menu.Item>
				<Menu.Divider />
				<Menu.Label>Quick Actions</Menu.Label>
				<Menu.Item
					leftSection={colorScheme === 'dark' ? <IconMoonStars size={14} /> : <IconSun size={14} />}
					onClick={() => toggleColorScheme()}
				>
					{colorScheme === 'dark' ? 'Light Mode' : 'Dark Mode'}
				</Menu.Item>

				<Menu.Divider />
				<Menu.Item
					leftSection={<IconLogout size={14} />}
					color="red"
					onClick={() => {
						signOut({ redirect: true, callbackUrl: '/' });
					}}
				>
					Sign out
				</Menu.Item>
			</MenuDropdown>
		</Menu>
	);
}
