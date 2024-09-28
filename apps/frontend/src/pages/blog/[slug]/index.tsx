/* eslint-disable no-undef */

import { Box, Skeleton } from '@mantine/core';

import Page from '@/components/Page';
import thumbnail from '@/public/images/thumbnails/newsletter.png';
import classes from '@/styles/blog.module.css';
import highlightClasses from '@/styles/highlight.module.css';
import fetcher from '@/utils/Fetcher';
import hljs from 'highlight.js';
import { NextPage } from 'next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { useEffect } from 'react';

const Blog: NextPage = ({ data }: any) => {
	useEffect(() => {
		hljs.initHighlighting();
	}, []);

	if (data)
		return (
			<Page
				head={{
					title: 'BuildTheEarth Blog',
					image: thumbnail,
				}}
			>
				<Skeleton h={60} w="50%" radius="xl" />
				<Skeleton h={14} mt={21} w="100%" radius="xl" />
				<Skeleton h={14} mt={16} w="85%" radius="xl" />
				<Skeleton h={14} mt={20} w="100%" radius="xl" />
				<Skeleton h={14} mt={16} w="100%" radius="xl" />
				<Skeleton h={14} mt={16} w="100%" radius="xl" />
				<Skeleton h={14} mt={16} w="30%" radius="xl" />
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
		fallback: true,
	};
}
