import { AppShellHeader, Group, Text } from '@mantine/core';

import Image from 'next/image';
import HeaderProfile from './HeaderProfile';

export interface Header {}

const Header = () => {
	return (
		<AppShellHeader>
			<Group h="100%" px="md" justify="space-between">
				<Group>
					<Image src="/logo.png" alt="Logo" width={32} height={32} style={{ marginRight: '4px' }} />
					<Text fw="bold" ff="var(--font-minecraft)" fz="20px" m={0}>
						MyBuildTheEarth
					</Text>
				</Group>

				<Group gap="sm">
					<HeaderProfile />
				</Group>
			</Group>
		</AppShellHeader>
	);
};

export default Header;
