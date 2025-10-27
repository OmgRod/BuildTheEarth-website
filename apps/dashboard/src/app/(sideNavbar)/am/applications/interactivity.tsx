'use client';

import { ActionIcon, Group, GroupProps, Select, TextInput, rem } from '@mantine/core';
import { IconSearch, IconX } from '@tabler/icons-react';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';

import { useDebouncedValue } from '@mantine/hooks';

export function SearchApplications(props: GroupProps) {
	const router = useRouter();
	const params = useSearchParams();
	const pathname = usePathname();

	const [searchValue, setSearchValue] = useState(() => params.get('query') || '');
	const [searchType, setSearchType] = useState(() => params.get('searchType') || 'applicant');
	const [onlyPending, setOnlyPending] = useState(() => params.get('onlyPending') === 'true');
	const [debouncedValue] = useDebouncedValue(searchValue, 500);

	const searchTypes = [
		{
			value: 'applicant',
			label: 'Applicant',
			example: 'User ID, SSO ID, Discord ID, Username, Minecraft Name...',
		},
		{
			value: 'reviewer',
			label: 'Reviewer',
			example: 'User ID, SSO ID, Discord ID, Username, Minecraft Name...',
		},
		{
			value: 'team',
			label: 'Build Region',
			example: 'Build Region Name, Country, IP, Invite, Slug...',
		},
	];

	useEffect(() => {
		const currentQuery = params.get('query') || '';
		const currentType = params.get('searchType') || 'applicant';
		const currentPending = params.get('onlyPending') === 'true';
		if (debouncedValue !== currentQuery || searchType !== currentType || onlyPending !== currentPending) {
			if (debouncedValue) {
				router.push(`${pathname}?query=${debouncedValue}&searchType=${searchType}&onlyPending=${onlyPending}&page=1`);
			} else {
				router.push(`${pathname}?page=${params.get('page') || 1}`);
			}
		}
		// Only run when debouncedValue, searchType, onlyPending, pathname, or router changes
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [debouncedValue, searchType, onlyPending, pathname, router]);

	return (
		<Group gap="sm" {...props} w="100%">
			<Select
				data={searchTypes}
				placeholder="Applicant"
				value={searchType}
				onChange={(value) => setSearchType(value || 'applicant')}
				clearable={false}
			/>
			<TextInput
				w="60%"
				placeholder={searchTypes.find((type) => type.value === searchType)?.example}
				rightSection={
					searchValue ? (
						<ActionIcon size="md" variant="subtle" onClick={() => setSearchValue('')}>
							<IconX style={{ width: rem(18), height: rem(18) }} stroke={2} />
						</ActionIcon>
					) : (
						<IconSearch style={{ width: rem(16), height: rem(16) }} />
					)
				}
				value={searchValue}
				onChange={(event) => setSearchValue(event.currentTarget.value)}
			/>
		</Group>
	);
}
