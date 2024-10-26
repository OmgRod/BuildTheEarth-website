<!-- markdownlint-disable -->
<div align="center">

<img width="128" src="https://cdn.buildtheearth.net/static/logos/bte.gif" />

# dashboard-website

_The dashboard for the BuildTheEarth Project._

![official](https://go.buildtheearth.net/official-shield)
![build](https://github.com/BuildTheEarth/website-frontend/actions/workflows/main.yml/badge.svg)
[![chat](https://img.shields.io/discord/706317564904472627.svg?color=768AD4&label=discord&logo=https%3A%2F%2Fdiscordapp.com%2Fassets%2F8c9701b98ad4372b58f13fd9f65f966e.svg)](https://discord.gg/buildtheearth)
[![donate](https://img.shields.io/endpoint.svg?url=https%3A%2F%2Fshieldsio-patreon.vercel.app%2Fapi%3Fusername%3Dbuildtheearth%26type%3Dpatrons&style=flat)](https://patreon.com/buildtheearth)
[![TypeScript](https://img.shields.io/badge/%3C%2F%3E-TypeScript-%230074c1.svg)](http://www.typescriptlang.org/)
[![lines](https://sloc.xyz/github/buildtheearth/website-frontend)](https://tenor.com/view/programming-crazy-hard-typing-mad-gif-7866344)
[![license: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

</div>
<!-- markdownlint-restore -->

+ [dashboard-website](#dashboard-website)
+ [🌍 About BuildTheEarth](#-about-buildtheearth)
+ [💻 The Dashboard Website](#-the-dashboard-website)
  + [Current Status](#current-status)
  + [Development](#development)
  + [Contributing](#contributing)
    + [Setup](#setup)
    + [Standards](#standards)
+ [🪢 License](#-license)

# 🌍 About BuildTheEarth

Our mission is to fully recreate the entire Earth in Minecraft at a 1:1 scale. One block in Minecraft equates to roughly one meter in the real world, meaning that this project will fully recreate the size of our planet. Anyone is able to join us and contribute to the largest and most expansive build project to ever have been attempted in Minecraft. Every language, nationality, and regional difference is accepted and regarded as our greatest attribute as we continue our journey to unite all of Humanity's greatest achievements into a single Minecraft world.
Join us in this massive project as we recreate the Earth in Minecraft, in 1:1 scale, one block at a time. Join us [here](https://buildtheearth.net/join).

# 💻 The Dashboard Website

This website acts as the main interface to all data and services used by the BuildTheEarth project. It connects data from the Main Website, the Minecraft network and other sources to allow for easy support and management of different tasks.

All BuildTheEarth staff members and members of BuildTeam Staff-Teams can view different parts of the website and edit data of their respective team. Owners of BuildTeams and BTE Managers can restrict or open access for other people if needed.

## Current Status

This project originated with the need for a single place to view and maintain user information and information on the main BuildTheEarth website. Since, its planned features have expanded.
We are currently in the development phase of this website. If you have any feature requests, please let us know by opening an issue or messaging us on Discord.

## Development

- The website is written in **[TypeScript][]**, a statically-typed superset of JavaScript;
- It uses **[next.js][]** for it's entire frontend;
- **[MantineUI][]** for styling;
- And it follows object-oriented and modularization principles.
- For version control, it follows a superset of the **[Conventional Commits][]** specification.
- **[Docker][]** is used for containerization and deployment.

## Contributing

If you wish to help by contributing to this project we greatly appreciate it but there are a few things you need to do first. We ask that you check with a member of the development team before working on and proposing any major changes. We are always open to pull requests which fix bugs or introduce new features. Please try to follow the present layout and structure of the application and dont introduce new design systems or development tools.

### Setup

To install and configure this website, follow the next.js default instalation path.

### Standards

Format the codebase with [Prettier][] using `yarn format`.

Lint the codebase with [ESLint][] using `yarn lint`.

# 🪢 License

This website is licensed under the [MIT License](license).

<!-- References -->

[invite]: https://discord.gg/QEkPmBy
[all contributors]: https://allcontributors.org
[alphaconsole bot]: https://github.com/AlphaConsole/AlphaConsoleBot/
[typescript]: https://www.typescriptlang.org/
[next.js]: https://nextjs.org
[MantineUI]: https://mantine.dev
[typeorm]: https://typeorm.io/
[docker]: https://www.docker.com/
[conventional commits]: https://www.conventionalcommits.org/en/v1.0.0/
[pm2]: https://pm2.io/
[docker]: https://docker.com/
[prettier]: https://prettier.io/
[eslint]: https://eslint.org/
