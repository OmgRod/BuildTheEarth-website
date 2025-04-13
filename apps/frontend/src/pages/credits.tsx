import { Anchor, TypographyStylesProvider } from '@mantine/core';

import thumbnail from '@/public/images/thumbnails/contact.png';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import Link from 'next/link';
import Page from '../components/Page';

const Credits = () => {
	return (
		<Page head={{ title: 'Credits', image: thumbnail }}>
			<TypographyStylesProvider>
				<h1>BuildTheEarth Website</h1>

				<p>
					Work on the BuildTheEarth Website is public at{' '}
					<Anchor component={Link} href={'https://github.com/BuildTheEarth/web'}>
						BuildTheEarth/web
					</Anchor>
					. We believe in transparency and would like you to contribute to this project aswell.
					<br />
					Special Thanks goes to these people:
				</p>
				<h2>Github Contributors</h2>
				<ol style={{ listStyleType: 'none' }}>
					<li>Nudelsuppe42: Frontend Programming</li>
					<li>Nachwahl: Backend Programming, API</li>
					<li>XboxBedrock: Deployment</li>
					<li>Cinnazeyy: Initial Design Ideas</li>
					<li>Coppertine: Initial Core Structure</li>
				</ol>
				<h2>Inspiration</h2>
				<ol style={{ listStyleType: 'none' }}>
					<li>
						Original Website:{' '}
						<Anchor component={Link} href={'https://github.com/BuildTheEarth/bte-website'}>
							BuildTheEarth/bte-website
						</Anchor>
						{' © '}
						<Anchor component={Link} href={'https://github.com/Xesau'}>
							Xesau
						</Anchor>
					</li>
					<li>
						Colors and Components:{' '}
						<Anchor component={Link} href={'https://mantine.dev'}>
							https://mantine.dev
						</Anchor>
					</li>
					<li>
						Design Requirements:{' '}
						<Anchor component={Link} href={'https://github.com/BuildTheEarth/bte-website'}>
							https://github.com/BuildTheEarth/bte-website
						</Anchor>
					</li>
					<li>
						Interactive Map:{' '}
						<Anchor component={Link} href={'https://map.bte-germany.de/'}>
							https://map.bte-germany.de
						</Anchor>
					</li>
				</ol>
				<h2>Used Packages</h2>
				<p>
					A list of packages and their licenses can be found at{' '}
					<Anchor
						component={Link}
						href={'https://raw.githubusercontent.com/BuildTheEarth/web/refs/heads/main/third-party-licenses.txt'}
					>
						third-party-licenses.txt
					</Anchor>{' '}
					and their respective websites.
				</p>
			</TypographyStylesProvider>
		</Page>
	);
};

export default Credits;

export async function getStaticProps({ locale }: any) {
	return {
		props: {
			...(await serverSideTranslations(locale, ['common'])),
		},
	};
}
