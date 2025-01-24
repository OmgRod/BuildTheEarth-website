'use client';

import { ApplicationQuestion } from '@/util/application';
import { Switch } from '@mantine/core';
import { IconCheckbox } from '@tabler/icons-react';

export interface CheckboxQuestionProps extends ApplicationQuestion {
	additionalData: {};
}

function validation(props: CheckboxQuestionProps): (value: string) => void {
	return (value: string) => {
		return false;
	};
}

const CheckboxQuestion = (props: CheckboxQuestionProps) => {
	return (
		<Switch
			required={props.required}
			description={props.subtitle}
			label={props.title}
			style={props.style}
			onChange={(e) => props.onChange && props.onChange(e.target.checked)}
			error={props.error}
			disabled={props.disabled}
			readOnly={props.readonly}
			checked={typeof props.value === 'string' ? props.value === 'true' : props.value}
		/>
	);
};

const EditQuestion: any = undefined;

CheckboxQuestion.edit = EditQuestion;
CheckboxQuestion.mockdata = {};
CheckboxQuestion.validation = validation;
CheckboxQuestion.icon = IconCheckbox;
export default CheckboxQuestion;
