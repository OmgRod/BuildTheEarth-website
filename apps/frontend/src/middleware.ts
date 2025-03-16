import { NextRequestWithAuth, withAuth } from 'next-auth/middleware';

export function middleware(request: NextRequestWithAuth) {
	if (request.nextUrl.pathname.includes('/manage') || request.nextUrl.pathname.includes('/me')) {
		return withAuth(request);
	}
}

// forcee
export const config = {
	matcher: ['/((?!api|_next/static|_next/image|auth|favicon.ico|robots.txt|images|$).*)'],
};
