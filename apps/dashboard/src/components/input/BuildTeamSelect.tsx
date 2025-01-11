import { Select } from '@mantine/core';
import React from 'react';
import useSWR from 'swr';

export function BuildTeamSelect(props: Omit<React.ComponentProps<typeof Select>, 'data'>) {
	const { data } = useSWR('/buildteams');

	return (
		<Select
			data={(data || [])?.map((team: any) => ({ label: team.name, value: team.id }))}
			disabled={!data}
			{...props}
		/>
	);
}
