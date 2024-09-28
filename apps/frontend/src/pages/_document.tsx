import { Head, Html, Main, NextScript } from 'next/document';

import { ColorSchemeScript } from '@mantine/core';
import { createGetInitialProps } from '@mantine/next';
import Script from 'next/script';

export const getInitialProps = createGetInitialProps();

export default function Document() {
	return (
		<Html lang="en">
			<Head>
				<ColorSchemeScript defaultColorScheme="auto" />
				<Script src="/path/to/highlight.min.js" />
				<script>hljs.highlightAll();</script>
			</Head>
			<body>
				<Main />
				<NextScript />
			</body>
		</Html>
	);
}
