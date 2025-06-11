'use client';
import { Box, Switch, Textarea, TextInput } from '@mantine/core';
import { useEffect } from 'react';
import { AdvancedClaimEditorClaim, useAdvancedClaimEditorStore } from './store';

export function AdvancedEditor({ initialClaim }: { initialClaim: AdvancedClaimEditorClaim | null }) {
	const { claim, setClaim, updateClaim } = useAdvancedClaimEditorStore();

	useEffect(() => {
		if (initialClaim && initialClaim.id != claim?.id) {
			setClaim(initialClaim);
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [initialClaim]);

	return (
		<Box m="md" maw="40%">
			<TextInput
				label="Claim Name"
				required
				placeholder={`A claim in ${claim?.city || 'my city'}`}
				value={claim?.name || ''}
				onChange={(e) => updateClaim({ name: e.currentTarget.value })}
				mb="md"
			/>
			<Textarea
				label="Claim Description"
				placeholder="A description of the claim"
				value={claim?.description || ''}
				onChange={(e) => updateClaim({ description: e.currentTarget.value })}
				mb="md"
				autosize
				minRows={4}
				maxRows={4}
			/>
			<TextInput
				label="City"
				required
				placeholder={`Boston`}
				value={claim?.city || ''}
				onChange={(e) => updateClaim({ city: e.currentTarget.value })}
				mb="md"
			/>
			<Switch
				label="Claim is public"
				checked={claim?.active || false}
				onChange={(e) => updateClaim({ active: e.currentTarget.checked })}
				mb="md"
				mt="xl"
			/>
			<Switch
				label="Claim is finished"
				checked={claim?.finished || false}
				onChange={(e) => updateClaim({ finished: e.currentTarget.checked })}
				mb="md"
			/>
			<pre>{JSON.stringify(claim, null, 2)}</pre>
		</Box>
	);
}
