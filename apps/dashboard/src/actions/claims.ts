'use server';
import prisma from '@/util/db';
import { revalidatePath } from 'next/cache';

export const adminChangeTeam = async (data: { claimId: string; teamId: string }) => {
	console.log('changeTeam', data);
	const claim = await prisma.claim.update({
		where: {
			id: data.claimId,
		},
		data: {
			buildTeam: { connect: { id: data.teamId } },
		},
	});

	revalidatePath(`/am/claims/${claim.id}`);
	return claim;
};
