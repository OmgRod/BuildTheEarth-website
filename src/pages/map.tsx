import { Button, Loader, rem } from '@mantine/core';
import { IconDashboard, IconFileText, IconHome, IconSearch } from '@tabler/icons-react';
import Map, { mapClickEvent, mapCopyCoordinates, mapCursorHover } from '../components/map/Map';
import { Spotlight, SpotlightActionData, spotlight } from '@mantine/spotlight';
import { useClipboard, useDebouncedState } from '@mantine/hooks';
import { useEffect, useState } from 'react';

import { ClaimDrawer } from '../components/map/ClaimDrawer';
import { IconPin } from '@tabler/icons';
import { NextPage } from 'next';
import Page from '../components/Page';
import mapboxgl from 'mapbox-gl';
import { searchInOSM } from '../utils/Fetcher';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { useRouter } from 'next/router';
import { useTranslation } from 'react-i18next';

const MapPage: NextPage = () => {
	const clipboard = useClipboard();
	const [opened, setOpened] = useState(false);
	const [query, setQuery] = useDebouncedState('', 200);
	const [searchActions, setSearchActions] = useState<any[]>([]);
	const [searchLoading, setSearchLoading] = useState(false);
	const [selected, setSelected] = useState<null | string>(null);
	const [map, setMap] = useState<mapboxgl.Map>();
	const { t } = useTranslation('map');
	const router = useRouter();

	useEffect(() => {
		if (/^[0-9a-fA-F]{8}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{12}$/gi.test(router.query.claim as string)) {
			setSelected(router.query.claim as string);
			setOpened(true);
		}
	}, [router.query.claim]);


	useEffect(() => {
		if (router.query.s) {
			spotlight.open();
			router.query.s = undefined;
		}
	}, [router.query.s, router.query]);

	useEffect(() => {
		if (!query) {
			setSearchActions([]);
		}

		const regexForCoords = /^[-+]?([1-8]?\d(\.\d+)?|90(\.0+)?),\s*[-+]?(180(\.0+)?|((1[0-7]\d)|([1-9]?\d))(\.\d+)?)$/;
		if (regexForCoords.test(query)) {
			let coords = query
				.replace(' ', '')
				.split(',')
				.map((q) => parseFloat(q));
			setSearchActions([
				{
					label: 'Go to coordinates',
					description: query,
					onTrigger: () =>
						map?.flyTo({
							center: [coords[1], coords[0]],
							zoom: 15,
						}),
					leftSection: <IconPin />,
				},
			]);
			setSearchLoading(false);
			return;
		}

		searchInOSM(query, map).then((res) => {
			setSearchActions(res);
			setSearchLoading(false);
		});
	}, [query, map]);

	return (
		<Page fullWidth>
			<ClaimDrawer open={opened} setOpen={setOpened} id={selected} map={map} t={t} />
			<Spotlight
				filter={(query, actions) => actions}
				actions={searchActions}
				nothingFound="..."
				searchProps={{
					leftSection: searchLoading ? <Loader size={'sm'} /> : <IconSearch style={{ width: rem(20), height: rem(20) }} stroke={1.5} />,
					placeholder: 'Search...',
				}}
				onQueryChange={(q) => {
					if (!q || q.length <= 3) {
						setSearchActions([]);
						setSearchLoading(false);
					} else {
						setQuery(q);
						setSearchLoading(true);
					}
				}}
			/>
			<div style={{ height: '96vh', width: '100%' }}>
				<Map
					src={`${process.env.NEXT_PUBLIC_API_URL}/claims/geojson`}
					onMapLoaded={(map) => {
						setMap(map);
						mapCopyCoordinates(map, clipboard);
						mapCursorHover(map, 'claims');
						mapClickEvent(map, 'claims', (f) => {
							setSelected(f.properties.id);
							setOpened(true);
						});
					}}
					initialStyle={Number.parseInt(router.query.style as string)}
				/>
			</div>
		</Page>
	);
};

export default MapPage;

export async function getStaticProps({ locale }: any) {
	return {
		props: {
			...(await serverSideTranslations(locale, ['common', 'map'])),
		},
	};
}
