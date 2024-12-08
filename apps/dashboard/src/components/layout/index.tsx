import { AppShell, AppShellMain } from '@mantine/core';

import { getSession } from '@/util/auth';
import ProtectionProvider from '../ProtectionProvider';
import Header from './header';
import { default as Navbar } from './navbar';

export interface LayoutProps {
	children: React.ReactNode;
}

/**
 * Root layout of Pages
 */
export default async function AppLayout(props: LayoutProps) {
	const session = await getSession();
	const isStaff = session?.user.realm_access.roles.includes('bte_staff');

	return (
		<AppShell
			navbar={{
				width: 300,
				breakpoint: 'sm',
			}}
			header={{ height: 60 }}
			padding="md"
		>
			<Navbar displayProtected={isStaff} />

			<Header />

			<AppShellMain style={{ position: 'relative', paddingBottom: 'calc(var(--mantine-spacing-xl) * 1.5)' }}>
				<ProtectionProvider>{props.children}</ProtectionProvider>
			</AppShellMain>
		</AppShell>
	);
}
