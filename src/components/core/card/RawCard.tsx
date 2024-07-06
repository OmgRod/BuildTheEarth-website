import { ActionIcon, Button, Group, Paper, Text, Tooltip } from "@mantine/core";
import { IconCopy, IconPencil } from "@tabler/icons-react";

import Link from "next/link";
import classes from "@/styles/RawCard.module.css";
import { useClipboard } from "@mantine/hooks";

export interface RawCardProps {
  id: string;
  title: string;
  withEdit?: boolean;
  withCopy?: boolean;
  copyText?: string;
  icon?: any;
  style?: React.CSSProperties;
  actions?: {
    label: string;
    href: string;
    target?: string;
    onClick?: () => void;
    icon: any;
  }[];
  children: React.ReactNode;
}

export function RawCard({
  title,
  withEdit = true,
  withCopy = true,
  ...props
}: RawCardProps) {
  const clipboard = useClipboard();

  return (
    <Paper withBorder p="md" radius="sm" style={props.style}>
      <Group justify="space-between" mb="xs">
        <Text size="xs" c="dimmed" className={classes.title}>
          {title}
        </Text>
        <Group gap="6">
          {props.actions?.map((action, i) => (
            <Tooltip label={action.label} key={"action_" + i}>
              <ActionIcon
                size="sm"
                variant="default"
                color="gray"
                aria-label={action.label}
                onClick={action.onClick}
                component={action.href ? Link : undefined}
                href={action.href}
                target={action.target}
              >
                <action.icon
                  style={{ width: "70%", height: "70%" }}
                  stroke={1.5}
                />
              </ActionIcon>
            </Tooltip>
          ))}
          {withCopy && (
            <Tooltip label="Copy to Clipboard">
              <ActionIcon
                className={classes.edit}
                size="sm"
                variant="light"
                color="gray"
                aria-label="Copy Field"
                onClick={() => {
                  clipboard.copy(props.copyText || props.children);
                }}
              >
                <IconCopy
                  style={{ width: "70%", height: "70%" }}
                  stroke={1.5}
                />
              </ActionIcon>
            </Tooltip>
          )}
          {withEdit && (
            <Tooltip label="Edit Field">
              <ActionIcon
                className={classes.edit}
                size="sm"
                variant="default"
                color="gray"
                aria-label="Edit Field"
                component={Link}
                href={`/t/edit?fld=${props.id}`}
              >
                <IconPencil
                  style={{ width: "70%", height: "70%" }}
                  stroke={1.5}
                />
              </ActionIcon>
            </Tooltip>
          )}

          {props.icon && (
            <props.icon className={classes.icon} size="1.4rem" stroke={1.5} />
          )}
        </Group>
      </Group>
      {props.children}
    </Paper>
  );
}
