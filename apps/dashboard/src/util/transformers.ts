import { MantineColor, MantineGradient } from '@mantine/core';

import { ApplicationStatus } from '@repo/db';
import { IconCheck, IconChecks, IconClock, IconX } from '@tabler/icons-react';

export function applicationStatusToColor(status: ApplicationStatus): MantineColor {
	switch (status) {
		case ApplicationStatus.SEND:
			return 'orange';
		case ApplicationStatus.TRIAL:
			return 'cyan';
		case ApplicationStatus.DECLINED:
			return 'red';
		case ApplicationStatus.ACCEPTED:
			return 'green';
		default:
			return 'gray';
	}
}
export function applicationStatusToGradient(status: ApplicationStatus): MantineGradient {
	switch (status) {
		case ApplicationStatus.SEND:
			return { from: 'indigo.9', to: 'indigo.6' };
		case ApplicationStatus.TRIAL:
			return { from: 'teal', to: 'green.7' };
		case ApplicationStatus.DECLINED:
			return { from: 'red', to: 'orange' };
		case ApplicationStatus.ACCEPTED:
			return { from: 'green', to: 'lime' };
		default:
			return { from: 'gray', to: 'gray' };
	}
}
export function applicationStatusToIcon(status: ApplicationStatus) {
	switch (status) {
		case ApplicationStatus.SEND:
			return IconClock;
		case ApplicationStatus.TRIAL:
			return IconCheck;
		case ApplicationStatus.DECLINED:
			return IconX;
		case ApplicationStatus.ACCEPTED:
			return IconChecks;
		default:
			return IconClock;
	}
}
export function applicationStatusToTooltip(status: ApplicationStatus) {
	switch (status) {
		case ApplicationStatus.SEND:
			return 'The team has received your application and is reviewing it.';
		case ApplicationStatus.TRIAL:
			return 'You have been accepted to the team on a trial basis.';
		case ApplicationStatus.DECLINED:
			return 'Your application has been declined. Please check the reason for more information.';
		case ApplicationStatus.ACCEPTED:
			return 'You have been accepted to the team.';
		default:
			return 'Unknown status.';
	}
}
