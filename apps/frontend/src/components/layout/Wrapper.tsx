'use server';

import { Box } from '@mantine/core';

/**
 * Root wrapper of Pages
 */
export default async function Wrapper({
	children,
	offsetHeader = true,
	style,
}: {
	children: React.ReactNode;
	offsetHeader?: boolean;
	style?: React.CSSProperties;
}) {
	return (
		<Box
			w="100%"
			pt={offsetHeader ? '54px' : '0'}
			h="100%"
			mih={`calc(100vh - ${offsetHeader ? '54px' : '0'})`}
			style={style}
		>
			{children}
		</Box>
	);
}
