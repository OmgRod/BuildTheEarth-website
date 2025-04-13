'use server';
import { getSession, hasRole } from '@/util/auth';

import ErrorDisplay from './core/ErrorDisplay';

import type { JSX } from 'react';

export async function Protection({ children, requiredRole }: { children: JSX.Element; requiredRole: string }) {
	const session = await getSession();

	if (!hasRole(session, requiredRole)) {
		return (
			<ErrorDisplay message="The Page you are trying to open requires special permissions. You are not authorized to view it. If you think this is a mistake please contact us." />
		);
	}

	return children;
}
