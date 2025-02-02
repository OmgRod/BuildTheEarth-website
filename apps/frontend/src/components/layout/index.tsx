'use server';

import { Box } from '@mantine/core';
import Footer from './footer';
import Header from './header';

export interface LayoutProps {
	children: React.ReactNode;
}

/**
 * Root layout of Pages
 */
export default async function AppLayout(props: LayoutProps) {
	return (
		<Box style={{ maxWidth: '100vw', overflowX: 'hidden', padding: 0, margin: 0 }}>
			<Header />
			<div style={{ width: '100%', padding: 0 }}>{props.children}</div>
			<Footer />
		</Box>
	);
}
