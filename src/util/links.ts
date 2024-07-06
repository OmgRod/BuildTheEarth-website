import { IconList } from "@tabler/icons-react";

/**
 * These links are used for navigation between buildteam related pages
 */
export const buildTeamNavLinks: NavLink[] = [
  { link: "/", label: "Team Overview", icon: IconList },
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
