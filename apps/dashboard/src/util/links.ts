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
	{
		link: '/me/network',
		label: 'Network Statistics',
		icon: 'ChartPie',
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
		protected: true,
		divider: true,
	},
	{
		link: '/am/users',
		label: 'Website Users',
		protected: 'bte_staff_website',
		icon: 'UsersGroup',
	},
	{
		link: '/am/teams',
		label: 'BuildTeams',
		protected: 'bte_staff_website',
		icon: 'UsersGroup',
	},
	{
		link: '/am/faq',
		label: 'FAQ',
		protected: 'bte_staff_website',
		icon: 'Bubble',
	},
	{
		link: '/am/claims',
		label: 'Map Claims',
		protected: 'bte_staff_website',
		icon: 'Polygon',
	},
	{
		link: '/am/applications',
		label: 'Team Applications',
		protected: 'bte_staff_website',
		icon: 'Forms',
	},
	{
		link: '/am/sso',
		label: 'SSO Configuration and Security',
		protected: 'bte_staff_admin',
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
	protected?: boolean | 'bte_staff_admin' | 'bte_staff_discord' | 'bte_staff_website' | 'bte_staff';
	divider?: boolean;
};
interface NavLinkGroup {
	[section: string]: NavLink[];
}
