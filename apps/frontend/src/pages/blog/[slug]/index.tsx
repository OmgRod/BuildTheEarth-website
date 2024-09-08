/* eslint-disable no-undef */

import Page from '@/components/Page';
import fetcher from '@/utils/Fetcher';
import { Title } from '@mantine/core';
import { NextPage } from 'next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { useRouter } from 'next/router';

const Newsletter: NextPage = ({ data }: any) => {
	const router = useRouter();
	const slug = router.query.slug;
	// const { data } = useSWR(`/blog/${slug}?slug=true`);

	return (
		<Page
			head={{
				title: data?.title,
				image: `https://cdn.buildtheearth.net/uploads/${data?.thumbnail?.name}`,
			}}
			description={`BuildTheEarth Newsletter Issue ${data?.id}, ${new Date(data?.publishedAt).toLocaleDateString()}`}
		>
			<Title>{data?.title}</Title>
			<p>{data?.summary}</p>
			{data?.content && <div dangerouslySetInnerHTML={{ __html: data.content }} />}
		</Page>
	);
};

export default Newsletter;

export async function getStaticProps({ locale, params }: any) {
	const res = await fetcher(`/blog/${params.slug}?slug=true`);
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
