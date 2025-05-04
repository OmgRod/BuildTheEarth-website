import { Avatar, Box, Card, Grid, GridCol, Group, Skeleton, Stack, Text, Title } from '@mantine/core';
import { IconCalendarCheck, IconMapPin } from '@tabler/icons-react';

export default async function Page() {
	return (
		<Box ml="md" maw="50vw">
			<Title order={1} mt="xl" mb="md">
				Participating Build Regions
			</Title>
			<Text c="dimmed" size="md" mb="lg">
				This list contains all Build Regions you are currently a member of. Each Build Region has its own Discord server
				and custom requirements, so make sure to join their server and read their information.
			</Text>
			<Stack gap="lg">
				{Array(4)
					.fill(0)
					.map((_a, i) => {
						return (
							<Skeleton key={i} className="animate-scale">
								<Card>
									<Grid>
										<GridCol span={0.75}>
											<Avatar size={32} src={''} />
										</GridCol>
										<GridCol span={6.25}>
											<Stack>
												<Title order={4}>Loading...</Title>
											</Stack>
										</GridCol>
										<GridCol span={5}>
											<Group wrap="nowrap" gap={5} mt={5}>
												<IconMapPin
													stroke={1.5}
													size={16}
													color="light-dark(var(--mantine-color-gray-5), var(--mantine-color-dark-3))"
												/>
												<Text fz="xs" c="dimmed">
													Loading...
												</Text>
											</Group>
											<Group wrap="nowrap" gap={5} mt={5}>
												<IconCalendarCheck
													stroke={1.5}
													size={16}
													color="light-dark(var(--mantine-color-gray-5), var(--mantine-color-dark-3))"
												/>
												<Text fz="xs" c="dimmed">
													Member since N/A
												</Text>
											</Group>
										</GridCol>
									</Grid>
								</Card>
							</Skeleton>
						);
					})}
			</Stack>
		</Box>
	);
}
