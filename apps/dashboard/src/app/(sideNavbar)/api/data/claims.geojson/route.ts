import prisma from '@/util/db';
import { NextRequest } from 'next/server';

export async function GET(req: NextRequest) {
	const searchParams = req.nextUrl.searchParams;

	const returnAsPoints = searchParams.get('points') ? searchParams.get('points') === 'true' : false;

	const filters = {
		finished: searchParams.get('finished') ? searchParams.get('finished') === 'true' : undefined,
		active: searchParams.get('active') ? searchParams.get('active') === 'true' : undefined,
		id: searchParams.get('id') ? searchParams.get('id') : undefined,
		user: searchParams.get('user') ? searchParams.get('user') : undefined,
		extended: searchParams.get('extended') ? searchParams.get('extended') === 'true' : undefined,
	};

	const claims = await prisma.claim.findMany(constructClaimGeoJSONQuery(filters));

	if (returnAsPoints) {
		const geojson = {
			type: 'FeatureCollection',
			features: claims
				.filter((c) => c.area.length > 0)
				.map((c) => {
					const center = c.center?.split(', ').map(Number);
					return {
						type: 'Feature',
						geometry: {
							type: 'Point',
							coordinates: center,
						},
						properties: { ...c, area: undefined },
						id: c.id,
					};
				}),
		};
		return Response.json(geojson, { headers: { 'Content-Type': 'application/geo+json' } });
	} else {
		const geojson = {
			type: 'FeatureCollection',
			features: claims
				.filter((c) => c.area.length > 0)
				.map((c) => {
					const mapped = c.area?.map((p: string) => p.split(', ').map(Number));
					if (c.area[0] != c.area[c.area.length - 1]) {
						mapped.push(mapped[0]);
					}
					return {
						type: 'Feature',
						geometry: {
							type: 'Polygon',
							coordinates: [mapped],
						},
						properties: { ...c, area: undefined, center: undefined },
						id: c.id,
					};
				}),
		};
		return Response.json(geojson, { headers: { 'Content-Type': 'application/geo+json' } });
	}
}

export function constructClaimGeoJSONQuery(filters: {
	finished?: boolean;
	active?: boolean;
	user?: string | null;
	extended?: boolean;
	id?: string | null;
}) {
	return {
		where: {
			finished: filters.finished,
			active: filters.active,
			owner: filters.user ? { OR: [{ ssoId: filters.user }, { id: filters.user }] } : undefined,
			id: filters.id ? { in: filters.id.split(',') } : undefined,
		},
		select: filters.extended
			? {
					id: true,
					area: true,
					center: true,
					finished: true,
					active: true,
					owner: {
						select: {
							id: true,
							ssoId: true,
							avatar: true,
							minecraft: true,
							username: true,
						},
					},
					builders: {
						select: {
							id: true,
							avatar: true,
							minecraft: true,
							username: true,
						},
					},
					buildings: true,
					buildTeam: {
						select: { id: true, slug: true, name: true, location: true },
					},
					description: true,
					city: true,
					name: true,
					osmName: true,
					images: {
						select: {
							id: true,
							hash: true,
							name: true,
							createdAt: true,
							height: true,
							width: true,
						},
					},
				}
			: { id: true, area: true, center: true, name: true, owner: { select: { id: true, ssoId: true } } },
	};
}
