'use client';

import { TextInput, TextInputProps, rem } from '@mantine/core';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';

import { IconSearch } from '@tabler/icons-react';
import { useDebouncedState } from '@mantine/hooks';
import { useEffect } from 'react';

export function SearchUsers(props: TextInputProps) {
	const [value, setValue] = useDebouncedState('', 500);
	const router = useRouter();
	const params = useSearchParams();
	const pathname = usePathname();

	useEffect(() => {
		if (value != params.get('query')) {
			if (value) {
				router.push(`${pathname}?query=${value}&page=1`);
			} else {
				router.push(`${pathname}?page=1`);
			}
		}
	}, [value, params, pathname, router]);

	return (
		<TextInput
			placeholder="ID, SSO ID, Discord ID, Username, Minecraft Name..."
			rightSection={<IconSearch style={{ width: rem(16), height: rem(16) }} />}
			defaultValue={value}
			onChange={(event) => setValue(event.currentTarget.value)}
			{...props}
		/>
	);
}
