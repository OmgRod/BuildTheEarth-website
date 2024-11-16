import { Group, Paper, Text } from '@mantine/core';

export function TextCard(props: {
	title: string;
	children: React.ReactNode | string;
	subtitle?: string;
	icon?: any;
	isText?: boolean;
}) {
	const Icon = props.icon;
	return (
		<Paper withBorder p="md" radius="md" key={props.title} m={0}>
			<Group justify="space-between">
				<Text size="xs" c="dimmed" fw={700} tt="uppercase">
					{props.title}
				</Text>
				{props.icon && (
					<Icon
						style={{ color: 'light-dark(var(--mantine-color-gray-4), var(--mantine-color-dark-3))' }}
						size="1.4rem"
						stroke={1.5}
					/>
				)}
			</Group>

			<Group align="flex-end" gap="xs" mt={25}>
				{typeof props.children == 'string' || props.isText ? (
					<Text fz="24px" fw={700} lh="1">
						{props.children}
					</Text>
				) : (
					props.children
				)}
			</Group>

			<Text fz="xs" c="dimmed" mt={7}>
				{props.subtitle}
			</Text>
		</Paper>
	);
}
