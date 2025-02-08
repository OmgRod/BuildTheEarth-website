'use client';

import { ActionIcon, Code, Group, Menu, MenuDropdown, MenuItem, MenuTarget, rem } from '@mantine/core';
import { IconDots, IconExternalLink, IconEye } from '@tabler/icons-react';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';

import { BuildTeamDisplay } from '@/components/data/BuildTeam';
import { UserDisplay } from '@/components/data/User';
import { Claim } from '@repo/db';
import { DataTable } from 'mantine-datatable';
import Link from 'next/link';

export default function ClaimsDatatable({ claims, count }: { claims: Claim[]; count: number }) {
	const router = useRouter();
	const params = useSearchParams();
	const pathname = usePathname();
	const page = Number(params.get('page')) || 1;

	return (
		<DataTable
			minHeight={500}
			columns={[
				{
					accessor: 'id',
					title: '#',
					render: ({ id }) => <Code>{id.split('-')[0]}</Code>,
					width: 120,
				},
				{
					accessor: 'name',
					width: 430,
				},

				{
					accessor: 'center',
					render: ({ center }) => <Code>{center}</Code>,
				},
				{
					accessor: 'city',
				},
				{
					accessor: 'owner',
					title: 'Owner',
					render: ({ owner }: any) => (owner ? <UserDisplay user={owner} /> : ''),
				},
				{
					accessor: 'buildTeam',
					title: 'BuildTeam',
					render: ({ buildTeam }: any) => (buildTeam ? <BuildTeamDisplay team={buildTeam} /> : ''),
				},
				{
					accessor: '',
					title: '',
					textAlign: 'right',
					render: (claim: Claim) => (
						<Group gap={4} justify="right" wrap="nowrap">
							<ActionIcon
								size="sm"
								variant="subtle"
								color="cyan"
								aria-label="View Details"
								component={Link}
								href={`/am/claims/${claim.id}`}
								rel="noopener"
							>
								<IconEye size={16} />
							</ActionIcon>
							<Menu>
								<MenuTarget>
									<ActionIcon size="sm" variant="subtle" color="gray" aria-label="More Actions">
										<IconDots size={16} />
									</ActionIcon>
								</MenuTarget>
								<MenuDropdown>
									<MenuItem
										leftSection={<IconEye style={{ width: rem(14), height: rem(14) }} />}
										color="cyan"
										aria-label="View Details"
										component={Link}
										href={`/am/claims/${claim.id}`}
										rel="noopener"
									>
										View Details
									</MenuItem>
									<MenuItem
										leftSection={<IconExternalLink style={{ width: rem(14), height: rem(14) }} />}
										component={Link}
										target="_blank"
										href={`https://buildtheearth.net/map?claim=${claim.id}`}
									>
										Open on Website
									</MenuItem>
								</MenuDropdown>
							</Menu>
						</Group>
					),
				},
			]}
			records={claims}
			recordsPerPage={20}
			totalRecords={count}
			page={page}
			onPageChange={(page) =>
				router.push(`${pathname}?${new URLSearchParams({ ...Object.fromEntries(params), page: page + '' }).toString()}`)
			}
			noRecordsText="No Claims found"
		/>
	);
}
