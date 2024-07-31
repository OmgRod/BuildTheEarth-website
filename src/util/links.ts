import {
  IconClock,
  IconFiles,
  IconList,
  IconMap,
  IconMessageReport,
  IconTool,
  IconUsersGroup,
} from "@tabler/icons-react";

/**
 * These links are used for navigation between buildteam related pages
 */
export const teamNavLinks: NavLink[] = [
  { link: "/team", label: "Team Overview", icon: IconList },
  { link: "/team/members", label: "Members", icon: IconUsersGroup },
  { link: "/team/tools", label: "Debug Tools", icon: IconTool },
];

/**
 * These links are used for navigation between tool pages
 */
export const meNavLinks: NavLink[] = [
  { link: "/tools/timezone", label: "Timezone Converter", icon: IconClock },
  { link: "/tools/coordinates", label: "Coordinate Converter", icon: IconMap },
  { link: "/tools/report", label: "Reports", icon: IconMessageReport },
  { link: "/tools/assets", label: "Assets", icon: IconFiles },
];

export const navLinks: NavLinkGroup = {
  team: teamNavLinks,
  me: meNavLinks,
};

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
interface NavLinkGroup {
  [section: string]: NavLink[];
}