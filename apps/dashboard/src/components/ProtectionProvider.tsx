'use client';

import { redirect, usePathname } from 'next/navigation';

import { navLinks } from '@/util/links';
import { useSession } from 'next-auth/react';

export default function ProtectionProvider({ children }: { children: React.ReactNode }) {
	const pathname = usePathname();
	const session = useSession();
	const requiredRole = navLinks.find((link) => link.link === pathname.split('/').slice(0, 3).join('/'))?.protected;

	if (
		requiredRole &&
		!session?.data?.user?.realm_access?.roles.includes(typeof requiredRole === 'boolean' ? 'bte_staff' : requiredRole)
	) {
		redirect('/');
	}

	return children;
}
