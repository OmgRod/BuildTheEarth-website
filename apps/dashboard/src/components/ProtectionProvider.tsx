'use client';

import { redirect, usePathname } from 'next/navigation';

import { useSession } from 'next-auth/react';

export default function ProtectionProvider({ children }: { children: React.ReactNode }) {
	const pathname = usePathname();
	const session = useSession();
	const isProtected = pathname.startsWith('/am/');
	const isStaff = session.data?.user.realm_access.roles.includes('bte_staff');

	if (isProtected && !isStaff) {
		redirect('/');
	}

	return children;
}
