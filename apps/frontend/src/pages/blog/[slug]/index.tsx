/* eslint-disable no-undef */

import Page from '@/components/Page';
import classes from '@/styles/blog.module.css';
import highlightClasses from '@/styles/highlight.module.css';
import fetcher from '@/utils/Fetcher';
import { Box } from '@mantine/core';
import hljs from 'highlight.js';
import { NextPage } from 'next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { useEffect } from 'react';

const Blog: NextPage = ({ data }: any) => {
	useEffect(() => {
		hljs.initHighlighting();
	}, []);

	if (!data)
		return (
			<Page
				head={{
					title: 'huh',
					image: '',
				}}
			>
				idk
				<pre>{JSON.stringify(data, null, 2)}</pre>
			</Page>
		);

	return (
		<Page
			head={{
				title: data.title,
				image: data.thumbnail,
			}}
			description={`BuildTheEarth Blog: ${data.title}, ${new Date(data.publishedAt).toLocaleDateString()}`}
		>
			<Box
				dangerouslySetInnerHTML={{ __html: data.content }}
				className={classes.parent + ' ' + highlightClasses.wrapper}
			/>
		</Page>
	);
};

export default Blog;

export async function getStaticProps({ locale, params }: any) {
	const res = await fetcher(`/blog/${params.slug}`);
	return {
		props: {
			data: res,
			...(await serverSideTranslations(locale, ['common', 'newsletter'])),
		},
		revalidate: 60 * 60 * 24 * 7, // Every week
	};
}
export async function getStaticPaths() {
	const res = await fetcher('/blog');
	return {
		paths: res.map((blogPost: any) => ({
			params: {
				slug: blogPost.slug,
			},
		})),
		fallback: false,
	};
}
