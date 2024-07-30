import {
  IconClock,
  IconList,
  IconMap,
  IconMessageReport,
  IconReport,
  IconTool,
  IconUsersGroup,
} from "@tabler/icons-react";

/**
 * These links are used for navigation between buildteam related pages
 */
export const buildTeamNavLinks: NavLink[] = [
  { link: "/", label: "Team Overview", icon: IconList },
  { link: "/members", label: "Members", icon: IconUsersGroup },
  { link: "/tools", label: "Debug Tools", icon: IconTool },
];

/**
 * These links are used for navigation between tool pages
 */
export const toolsNavLiks: NavLink[] = [
  { link: "/timezone", label: "Timezone Converter", icon: IconClock },
  { link: "/coordinates", label: "Coordinate Converter", icon: IconMap },
  { link: "/report", label: "Reports", icon: IconMessageReport },
];

/**
 * These links are used for navigation between management and staff pages
 */
export const adminNavLinks: NavLink[] = [];

/**
 * Converts a NavLink array to an array of href links
 * @param links Links to convert to blank links
 * @returns a array of only the href itself
 */
export function toBlankLink(links: NavLink[]): string[] {
  return links.map((link) => link.link);
}

interface NavLink {
  link: string;
  label: string;
  icon: any;
}
