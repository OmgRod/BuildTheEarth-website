import { Paper, PaperProps, PolymorphicComponentProps } from '@mantine/core';

export function BlankCard(props: PolymorphicComponentProps<'div', PaperProps>) {
	return <Paper withBorder p="md" radius="md" m={0} {...props} />;
}
