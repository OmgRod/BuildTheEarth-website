'use server';

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
