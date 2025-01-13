import { checkUpload, deleteUpload } from '@/app/actions';
import { Box, Title } from '@mantine/core';

import { Protection } from '@/components/Protection';
import prisma from '@/util/db';
import UploadsDatatable from './datatable';

export default async function Page({
	searchParams,
}: {
	searchParams: Promise<{ page: string | undefined; query: string | undefined }>;
}) {
	const page = (await searchParams).page;
	const searchQuery = (await searchParams).query;
	const uploadCount = await prisma.upload.count({});
	const uploads = await prisma.upload.findMany({
		take: 50,
		skip: (Number(page || '1') - 1) * 50,
		where: {
			checked: false,
		},
		select: {
			createdAt: true,
			id: true,
			claimId: true,
			hash: true,
			height: true,
			width: true,
			name: true,
		},
	});

	return (
		<Protection requiredRole="review-uploads">
			<Box mx="md" maw="90vw">
				<Title order={1} mt="xl" mb="md">
					Check Image Uploads
				</Title>
				<UploadsDatatable
					uploads={uploads.map((u) => ({ ...u, createdAt: u.createdAt.toISOString() }))}
					count={uploadCount}
					onCheckAction={checkUpload}
					onDeleteAction={deleteUpload}
				/>
			</Box>
		</Protection>
	);
}
