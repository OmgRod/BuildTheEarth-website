import { IconList, IconTool, IconUsersGroup } from '@tabler/icons-react';

/**
 * These links are used for navigation between buildteam related pages
 */
export const teamNavLinks: NavLink[] = [
	{ link: '/team', label: 'Team Overview', icon: IconList },
	{ link: '/team/members', label: 'Members', icon: IconUsersGroup },
	{ link: '/team/tools', label: 'Debug Tools', icon: IconTool },
];

/**
 * These links are used for navigation between tool pages
 */
export const meNavLinks: NavLink[] = [
	{
		link: '/',
		label: 'My Home',
		icon: 'Home',
	},
	{
		link: '/me/teams',
		label: 'Participating Teams',
		icon: 'UsersGroup',
	},
	{
		link: '/me/applications',
		label: 'My Applications',
		icon: 'Forms',
	},
	{
		link: '/me/claims',
		label: 'Claim Overview',
		icon: 'Polygon',
	},

	// ---- Account Links ----
	{ link: '', label: 'Your Account', icon: null, divider: true },
	{
		link: '/me/connections',
		label: 'Social Connections',
		icon: 'PlugConnected',
	},
	{
		link: '/me/sessions',
		label: 'Active Sessions',
		icon: 'DeviceDesktop',
	},
	{
		link: '/me/settings',
		label: 'Global Settings',
		icon: 'Settings',
	},

	// ---- Staff Links ----
	{
		link: '',
		label: 'Staff Hub',
		icon: null,
		permission: 'bte_staff',
		divider: true,
	},
	{
		link: '/am/users',
		label: 'Website Users',
		permission: 'get-users',
		icon: 'UsersGroup',
	},
	{
		link: '/am/teams',
		label: 'BuildTeams',
		permission: 'get-teams',
		icon: 'UsersGroup',
	},
	{
		link: '/am/faq',
		label: 'FAQ',
		permission: 'get-faq',
		icon: 'Bubble',
	},
	{
		link: '/am/claims',
		label: 'Map Claims',
		permission: 'get-claims',
		icon: 'Polygon',
	},
	{
		link: '/am/applications',
		label: 'Team Applications',
		permission: 'get-applications',
		icon: 'Forms',
	},
	{
		link: '/am/sso',
		label: 'SSO Configuration and Security',
		permission: 'get-config',
		icon: 'Settings',
	},
];

export const navLinks = meNavLinks;

/**
 * Converts a NavLink array to an array of href links
 * @param links Links to convert to blank links
 * @returns a array of only the href itself
 */
export function toBlankLink(links: NavLink[]): string[] {
	return links.filter((l) => !l.divider).map((link) => link.link);
}

type NavLink = {
	link: string;
	label: string;
	icon: any;
	permission?: string;
	divider?: boolean;
};
interface NavLinkGroup {
	[section: string]: NavLink[];
}
