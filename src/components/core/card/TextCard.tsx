import { Text, TextProps } from "@mantine/core";
import { RawCard, RawCardProps } from "./RawCard";

export default function TextCard({
  text,
  textProps,
  ...props
}: Omit<RawCardProps, "children"> & { text?: string; textProps?: TextProps }) {
  return (
    <RawCard {...props} copyText={text}>
      <Text fw="bold" className="xl2" {...textProps}>
        {text}
      </Text>
    </RawCard>
  );
}
