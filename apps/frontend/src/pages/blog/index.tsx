/* eslint-disable no-undef */

import {
	Badge,
	Breadcrumbs,
	Card,
	CardSection,
	Grid,
	GridCol,
	Group,
	Image,
	Pagination,
	Text,
	useMantineColorScheme,
	useMantineTheme,
} from '@mantine/core';

import Page from '@/components/Page';
import thumbnail from '@/public/images/thumbnails/newsletter.png';
import fetcher from '@/utils/Fetcher';
import { NextPage } from 'next';
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { useRouter } from 'next/router';
import { useState } from 'react';

const NewsletterList: NextPage = ({ data }: any) => {
	const router = useRouter();
	const theme = useMantineTheme();
	const scheme = useMantineColorScheme();
	const { t } = useTranslation('newsletter');
	const [activePage, setPage] = useState(1);

	return (
		<Page
			head={{
				title: 'BuildTheEarth Blog',
				image: thumbnail,
			}}
			description="Explore various aspects of BuildTheEarth on the BuildTheEarth Blog. From Builder Stories to technical Discussions."
		>
			<p>
				Explore various aspects of BuildTheEarth on the BuildTheEarth Blog. From Builder Stories to technical
				Discussions.
			</p>
			<Grid mt="xl">
				{data?.slice(activePage * 8 - 8, activePage * 8).map((post: any, i: number) => (
					<GridCol key={post.id} span={4}>
						<Card onClick={() => router.push(`/blog/${post.slug}`)} withBorder h="100%" w="100%">
							<CardSection withBorder>
								<Image src={post.thumbnail} alt={'Thumbnail Image'} height={100} />
							</CardSection>
							<Text fz="lg" mt="md" fw={'bold'} lineClamp={2}>
								{post.title}
							</Text>
							<Group mt="sm" gap="xs">
								{post.metadata?.tags
									?.split(', ')
									.slice(0, 3)
									.map((tag: string) => (
										<Badge key={tag} variant="dot" size="sm">
											{tag}
										</Badge>
									))}
							</Group>
							<CardSection withBorder p="md" mt="md">
								<Breadcrumbs separator="·" fz="sm" c="dimmed">
									{new Date(post.publishedAt).toLocaleDateString()}
									{post.author?.name}
								</Breadcrumbs>
							</CardSection>
						</Card>
					</GridCol>
				))}
			</Grid>
			<Group justify="center" pt="md">
				<Pagination total={data?.pages || 1} radius="xs" value={activePage} onChange={setPage} siblings={1} />
			</Group>
		</Page>
	);
};

export default NewsletterList;

export async function getStaticProps({ locale }: any) {
	const res = await fetcher('/blog');

	return {
		props: {
			...(await serverSideTranslations(locale, ['common', `newsletter`])),
			data: res.sort((a: any, b: any) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()),
		},
		revalidate: 60 * 60 * 24, // Every 20 minutes
	};
}
