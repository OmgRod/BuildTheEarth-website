'use server';

import LinkButton from '@/components/core/LinkButton';
import Wrapper from '@/components/layout/Wrapper';
import prisma from '@/util/db';
import { BackgroundImage, Text, Title } from '@mantine/core';

export default async function Page() {
	const headImage = await prisma.showcase.findFirst;

	return (
		<Wrapper offsetHeader={false}>
			<BackgroundImage src="/home.jpg" w="100%" h="100%" mih="100vh" style={{ position: 'relative', zIndex: 0 }}>
				<div style={{}}>
					<Text>We are</Text>
					<Title
						order={1}
						style={{
							color: 'white',
							fontSize: 'calc(var(--mantine-font-size-xl) * 3)',
							textShadow: 'var(--mantine-shadow-xl)',
						}}
					>
						Recreating The Whole Earth In Minecraft
					</Title>
					<LinkButton href="/join" size="xl" mt="xl">
						Join us
					</LinkButton>
				</div>
			</BackgroundImage>
		</Wrapper>
	);
}
