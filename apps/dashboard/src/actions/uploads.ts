'use server';
import prisma from '@/util/db';
import { revalidatePath } from 'next/cache';

export const adminCheckUpload = async (id: string) => {
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

export const adminDeleteUpload = async (id: string) => {
	const upload = await prisma.upload.delete({
		where: {
			id,
		},
	});

	revalidatePath('/am/uploads/check');
};
