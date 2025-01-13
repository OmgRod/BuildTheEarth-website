import { AppShell, AppShellMain } from '@mantine/core';

import { getSession } from '@/util/auth';
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

	return (
		<AppShell
			navbar={{
				width: 300,
				breakpoint: 'sm',
			}}
			header={{ height: 60 }}
			padding="md"
		>
			<Navbar roles={session?.user.realm_access.roles || []} />

			<Header />

			<AppShellMain style={{ position: 'relative', paddingBottom: 'calc(var(--mantine-spacing-xl) * 1.5)' }}>
				{props.children}
			</AppShellMain>
		</AppShell>
	);
}
