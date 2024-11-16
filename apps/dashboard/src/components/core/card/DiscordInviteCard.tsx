"use client";

import { Avatar, Card, CardSection, Group, Image, NumberFormatter, Text } from '@mantine/core';

import useSWR from 'swr';
import LinkButton from '../LinkButton';
import { blankFetcher } from '../SWRSetup';

export interface DiscordInviteCardProps {
	style?: React.CSSProperties;
	invite: string;
	withSplash?: boolean;
}

export function DiscordInviteCard({ withSplash = true, ...props }: DiscordInviteCardProps) {
	const inviteCode = props.invite.split('/').pop();

	const { data } = useSWR(
		`https://discord.com/api/v10/invites/${inviteCode}?with_counts=true&with_expiration=true`,
		blankFetcher,
		{},
	);

	return (
		data && (
			<Card
				withBorder
				radius="sm"
				style={{
					background: 'light-dark(var(--mantine-color-white) , var(--mantine-color-dark-7))',
				}}
			>
				{withSplash && (
					<CardSection withBorder mb="sm">
						<Image
							src={`https://cdn.discordapp.com/splashes/${data.guild.id}/${data.guild.splash}.jpg?size=480`}
							h={80}
							alt="No way!"
						/>
					</CardSection>
				)}
				<Text size="xs" c="dimmed" fw="bold" mb="sm" tt="uppercase">
					You were invited to join a server
				</Text>
				<Group justify="space-between">
					<Group>
						<Avatar
							src={`https://cdn.discordapp.com/icons/${data.guild.id}/${data.guild.icon}.webp?size=56`}
							size={56}
							radius="sm"
						/>
						<div style={{ lineClamp: 1, maxWidth: '80%' }}>
							<Text size="lg" fw="bold" lineClamp={1}>
								{data.guild.name}
							</Text>
							<Text size="sm" c="dimmed" lineClamp={1} span>
								<span
									style={{
										color: 'var(--mantine-color-green-7)',
										fontWeight: 'bold',
									}}
								>
									•
								</span>{' '}
								<NumberFormatter value={data.approximate_presence_count} thousandSeparator />
								{' Online '}
								<span
									style={{
										color: 'var(--mantine-color-dark-5)',
										fontWeight: 'bold',
									}}
								>
									•
								</span>{' '}
								<NumberFormatter value={data.approximate_member_count} thousandSeparator /> Members
							</Text>
						</div>
					</Group>
					<LinkButton color="green" href={props.invite} target="_blank">
						Join
					</LinkButton>
				</Group>
			</Card>
		)
	);
}
