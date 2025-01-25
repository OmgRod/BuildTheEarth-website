'use server';

import { Box } from '@mantine/core';
import Header from './header';

export interface LayoutProps {
	children: React.ReactNode;
}

/**
 * Root layout of Pages
 */
export default async function AppLayout(props: LayoutProps) {
	return (
		<Box style={{ maxWidth: '100vw', overflowX: 'hidden' }}>
			<Header />

			<div>{props.children}</div>
		</Box>
	);
}
