import { Select } from '@mantine/core';
import React from 'react';
import useSWR from 'swr';

export function BuildTeamSelect(
	props: Omit<Omit<React.ComponentProps<typeof Select>, 'data'>, 'filter'> & {
		filter?: (buildTeam: {
			id: string;
			slug: string;
			name: string;
			location: string;
			allowBuilderClaim: boolean;
		}) => boolean;
	},
) {
	const { data } = useSWR('/buildteams');

	return (
		<Select
			data={(props.filter ? (data || []).filter(props.filter) : data || []).map((team: any) => ({
				label: team.name,
				value: team.id,
			}))}
			disabled={!data}
			{...{ ...props, filter: undefined }}
		/>
	);
}
