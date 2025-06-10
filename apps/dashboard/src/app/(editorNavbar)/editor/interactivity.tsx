'use client';
import { BuildTeamSelect } from '@/components/input/BuildTeamSelect';
import { Button, Group, Title } from '@mantine/core';
import { IconDeviceFloppy, IconPencil, IconPlus, IconTrash } from '@tabler/icons-react';
import Link from 'next/link';
import { useState } from 'react';
import { useClaimEditorStore } from './store';

export function SaveButtonGroup() {
	const editorStore = useClaimEditorStore();
	const { drawInstance, selectedClaimId } = editorStore;
	let claimName = 'None selected';
	if (drawInstance && selectedClaimId) {
		const feature = drawInstance.get(selectedClaimId);
		if (feature && feature.properties?.name) {
			claimName = feature.properties.name;
		}
	}
	return (
		<Group my="md" mx="md" justify="space-between">
			<Title order={2} lh={1}>
				Editing: {claimName}
			</Title>
			<Group>
				<Button
					variant="outline"
					color="orange"
					disabled={!editorStore.selectedClaimId}
					component={Link}
					href={`/editor/${editorStore.selectedClaimId}`}
					rightSection={<IconPencil size={16} />}
				>
					Open in advanced Editor
				</Button>
				<Button
					variant="outline"
					color="red"
					disabled={!editorStore.selectedClaimId}
					onClick={() => editorStore.delete()}
					rightSection={<IconTrash size={16} />}
				>
					Delete
				</Button>
				<Button
					variant="gradient"
					gradient={{ from: 'indigo', to: 'cyan' }}
					disabled={!editorStore.isDirty}
					onClick={() => editorStore.saveChanges()}
					rightSection={<IconDeviceFloppy size={16} />}
				>
					Save
				</Button>
			</Group>
		</Group>
	);
}

export function NewClaimButton() {
	const editorStore = useClaimEditorStore();
	return (
		<Button
			variant="gradient"
			gradient={{ from: 'indigo', to: 'cyan' }}
			disabled={editorStore.isDirty || !editorStore.allowedBuildTeamIds?.length || !editorStore.drawInstance}
			fullWidth
			onClick={() => editorStore.drawInstance?.changeMode('draw_polygon')}
			rightSection={<IconPlus size={16} />}
		>
			Create new Claim
		</Button>
	);
}

export function SelectBuildTeamModal(props: {
	allowedBuildTeamIds?: string[] | null;
	continue(buildTeamId: string | false): void;
}) {
	const [buildTeamId, setBuildTeamId] = useState<string | null>(null);
	return (
		<>
			<BuildTeamSelect
				filter={(bt) => bt.allowBuilderClaim && !!props.allowedBuildTeamIds?.includes(bt.id)}
				searchable
				placeholder="Select a Build Team"
				onChange={setBuildTeamId}
				value={buildTeamId}
			/>
			<Button
				fullWidth
				mt="md"
				disabled={!buildTeamId}
				onClick={() => props.continue(buildTeamId || false)}
				rightSection={<IconPlus size={16} />}
			>
				Create Claim
			</Button>
		</>
	);
}
