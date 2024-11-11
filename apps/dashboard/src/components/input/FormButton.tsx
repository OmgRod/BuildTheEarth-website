"use client"

import { Button, ButtonProps, PolymorphicComponentProps } from '@mantine/core';
import { useEffect, useState } from 'react';

import { useFormStatus } from 'react-dom';

export function FormButton(props: PolymorphicComponentProps<"button", ButtonProps>) {
	const {pending} = useFormStatus();
 const [isLoading, setIsLoading] = useState(false);

 useEffect(() => {
	console.log(new Date().toISOString(), "pending: "+pending)
	setIsLoading(pending);
 }, [pending]);

	return <Button loading={isLoading} {...props} />;
}
