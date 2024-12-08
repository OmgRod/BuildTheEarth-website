import { DefaultMantineColor, SimpleGrid, Text, UnstyledButton } from '@mantine/core';

import classes from '@/styles/ActionsCard.module.css';
import { BlankCard } from './BlankCard';

export function ActionsCard({
	links,
	title,
	withCard = true,
}: {
	title?: string;
	withCard?: boolean;
	links: {
		title: string;
		url: string;
		color: DefaultMantineColor;
		icon: any;
	}[];
}) {
	const items = links.map((item) => (
		<UnstyledButton key={item.title} className={classes.item}>
			<item.icon color={`var(--mantine-color-${item.color}-6`} size={32} />
			<Text size="xs" mt={7}>
				{item.title}
			</Text>
		</UnstyledButton>
	));
	const Wrapper = withCard ? BlankCard : 'div';

	return (
		<Wrapper>
			{title && (
				<Text size="xs" c="dimmed" fw={700} tt="uppercase">
					{title}
				</Text>
			)}

			<SimpleGrid cols={3} mt="md">
				{items}
			</SimpleGrid>
		</Wrapper>
	);
}
