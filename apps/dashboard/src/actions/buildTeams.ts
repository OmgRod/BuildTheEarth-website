'use server';
import { revalidateWebsitePaths } from '@/util/data';
import prisma from '@/util/db';
import { revalidatePath } from 'next/cache';

export const adminTransferTeam = async (
	prevState: any,
	{
		id,
		destinationId,
		step,
	}: {
		id: string;
		destinationId: string;
		step: string;
	},
) => {
	switch (step) {
		case 'test':
			console.log('test', id, destinationId);
			return {};
		case 'move-claims':
			const claims = await prisma.claim.updateMany({
				where: { buildTeamId: id },
				data: { buildTeamId: destinationId },
			});
			return claims;
		case 'move-showcases':
			const showcases = await prisma.showcase.updateMany({
				where: { buildTeamId: id },
				data: { buildTeamId: destinationId },
			});
			console.log('showcases', showcases);
			return showcases;
		case 'move-calendar':
			const calendar = await prisma.calendarEvent.updateMany({
				where: { buildTeamId: id },
				data: { buildTeamId: destinationId },
			});
			console.log('calendar', calendar);
			return calendar;
		case 'copy-members':
			const members = await prisma.user.findMany({
				where: { joinedBuildTeams: { some: { id } } },
				select: { id: true },
			});
			const transaction = await prisma.$transaction(
				members.map((m) =>
					prisma.user.update({ where: { id: m.id }, data: { joinedBuildTeams: { connect: { id: destinationId } } } }),
				),
			);
			console.log('members', members);
			return members;
		case 'delete-applications':
			const applicationAnswers = await prisma.applicationAnswer.deleteMany({
				where: { application: { buildteamId: id } },
			});
			const applications = await prisma.application.deleteMany({
				where: { buildteamId: id },
			});
			console.log('applications', applications);
			return applications;
		case 'delete-application-questions':
			const applicationQuestions = await prisma.applicationQuestion.deleteMany({
				where: { buildTeamId: id },
			});
			console.log('applicationQuestions', applicationQuestions);
			return applicationQuestions;
		case 'delete-application-responses':
			const applicationResponses = await prisma.applicationResponseTemplate.deleteMany({
				where: { buildteamId: id },
			});
			console.log('applicationResponses', applicationResponses);
			return applicationResponses;
		case 'delete-socials':
			const socials = await prisma.social.deleteMany({
				where: { buildTeamId: id },
			});
			console.log('socials', socials);
			return socials;
		case 'delete-permissions':
			const permissions = await prisma.userPermission.deleteMany({
				where: { buildTeamId: id },
			});
			console.log('permissions', permissions);
			return permissions;
		case 'remove-members':
			const removeMembers = await prisma.buildTeam.update({
				where: { id },
				data: {
					members: {
						set: [],
					},
				},
				select: { id: true, slug: true },
			});
			console.log('removeMembers', removeMembers);
			return removeMembers;
		case 'delete-team':
			const team = await prisma.buildTeam.delete({
				where: { id },
			});
			console.log('team', team);
			revalidateWebsitePaths(['/teams', `/teams/${team.slug}`]);
			return team;
		case 'reload-data':
			revalidatePath('/am/teams');
			revalidateWebsitePaths(['/', '/gallery', '/map']);
			return {};
		default:
			return {};
	}
};
