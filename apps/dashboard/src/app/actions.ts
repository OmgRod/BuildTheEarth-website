'use server';

import { revalidateWebsitePaths } from '@/util/data';
import prisma from '@/util/db';
import { revalidatePath } from 'next/cache';

export const addFaqQuestion = async (data: { question: string; answer: string }) => {
	const { question, answer } = data;

	const faq = await prisma.fAQQuestion.create({
		data: {
			question,
			answer,
		},
	});

	revalidatePath('/am/faq');
	return faq;
};

export const editFaqQuestion = async (data: { question: string; answer: string; id: string }) => {
	const faq = await prisma.fAQQuestion.update({
		where: {
			id: data.id,
		},
		data: {
			question: data.question,
			answer: data.answer,
		},
	});

	revalidatePath('/am/faq');
	return faq;
};

export const deleteFaqQuestion = async (id: any) => {
	const faq = await prisma.fAQQuestion.delete({
		where: {
			id,
		},
	});

	revalidatePath('/am/faq');
	return faq;
};

export const checkUpload = async (id: string) => {
	const upload = await prisma.upload.update({
		where: {
			id,
		},
		data: {
			checked: true,
		},
	});

	revalidatePath('/am/uploads/check');
};

export const deleteUpload = async (id: string) => {
	const upload = await prisma.upload.delete({
		where: {
			id,
		},
	});

	revalidatePath('/am/uploads/check');
};

export const addContact = async (data: { name: string; role: string; email: string; discord: string }) => {
	const contact = await prisma.contact.create({
		data,
	});

	revalidatePath('/am/contacts');
	return contact;
};

export const editContact = async (data: { id: string; name: string; role: string; email: string; discord: string }) => {
	const contact = await prisma.contact.update({
		where: {
			id: data.id,
		},
		data: {
			name: data.name,
			role: data.role,
			email: data.email,
			discord: data.discord,
		},
	});

	revalidatePath('/am/contacts');
	return contact;
};

export const deleteContact = async (id: any) => {
	const contact = await prisma.contact.delete({
		where: {
			id,
		},
	});

	revalidatePath('/am/contacts');
	return contact;
};

export const transferTeam = async (
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
	console.log('transferTeam', id, destinationId, step);
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
