"use client";

import { useLocalStorage } from '@mantine/hooks';
import { useEffect } from 'react';
import useSWR from 'swr';
import { useUser } from './useUser';

export default function useAvailableBuildTeam() {
	const [activeTeam, setActiveTeam] = useLocalStorage<string>({
		key: 'bte-active-build-team',
	});
	const [availableTeamsCache, setAvailableTeams] = useLocalStorage<
		{
			id: string;
			location: string;
			slug: string;
			name: string;
			icon: string;
			creatorId: string;
		}[]
	>({
		key: 'bte-available-build-team',
	});

	const { user } = useUser();
	const { data } = useSWR(`/users/${user?.id}`);

	useEffect(() => {
		if (data) {
			setAvailableTeams(data.createdBuildTeams);
		}
	}, [data]);

	return {
		activeBuildTeam: availableTeamsCache?.find((team) => team.id == activeTeam),
		activeBuildTeamId: activeTeam,
		setActiveBuildTeam: setActiveTeam,
		availableBuildTeams: availableTeamsCache,
	};
}
