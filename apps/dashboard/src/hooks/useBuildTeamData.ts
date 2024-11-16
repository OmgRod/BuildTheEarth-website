"use client";

import { useLocalStorage } from '@mantine/hooks';
import useSWR from 'swr';

export default function useBuildTeamData(link: string) {
	const [activeBuildTeamId] = useLocalStorage<string>({
		key: 'bte-active-build-team',
	});

	const data = useSWR(`/buildteams/${activeBuildTeamId}${link}`);

	return data;
}
