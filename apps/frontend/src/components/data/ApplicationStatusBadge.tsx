/*
{a.status == 'SEND' ? (
												<Badge variant="gradient" gradient={{ from: 'orange', to: 'yellow' }}>
													Needs Review
												</Badge>
											) : a.status == 'ACCEPTED' ? (
												<Badge variant="gradient" gradient={{ from: 'green', to: 'lime' }}>
													Accepted
												</Badge>
											) : a.status == 'TRIAL' ? (
												<Badge variant="gradient" gradient={{ from: 'green', to: 'lime' }}>
													Trial
												</Badge>
											) : (
												<Badge variant="gradient" gradient={{ from: 'red', to: 'orange' }}>
													Rejected
												</Badge>
											)}*/

import { Badge, BadgeProps } from '@mantine/core';

import { applicationStatusToGradient } from '@/util/transformers';
import { ApplicationStatus } from '@repo/db';

export function ApplicationStatusBadge({ status, ...props }: { status: ApplicationStatus } & BadgeProps) {
	let text = '';

	switch (status) {
		case ApplicationStatus.SEND:
			text = 'Needs Review';
			break;
		case ApplicationStatus.TRIAL:
			text = 'Trial';
			break;
		case ApplicationStatus.DECLINED:
			text = 'Rejected';
			break;
		case ApplicationStatus.ACCEPTED:
			text = 'Accepted';
			break;
		default:
			text = 'Unknown';
	}

	return (
		<Badge {...props} variant="gradient" gradient={applicationStatusToGradient(status)}>
			{text}
		</Badge>
	);
}
