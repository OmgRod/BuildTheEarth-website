'use client';

import useSWR from 'swr';

export const useUser = () => {
	const { data } = useSWR('/account');

	const user = {
		user: data,
	};
	return user;
};
