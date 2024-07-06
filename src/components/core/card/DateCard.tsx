import { RawCard, RawCardProps } from "./RawCard";
import { Text, TextProps } from "@mantine/core";
import { toHumanDate, toHumanDateTime } from "@/util/date";

import { IconCalendar } from "@tabler/icons-react";

export default function DateCard({
  date,
  withTime,
  textProps,
  ...props
}: Omit<RawCardProps, "children"> & {
  date: string;
  textProps?: TextProps;
  withTime?: boolean;
}) {
  const readable = withTime ? toHumanDateTime(date) : toHumanDate(date);
  return (
    <RawCard
      {...props}
      copyText={readable}
      actions={[
        {
          label: "Open in Timezone Tool",
          icon: IconCalendar,
          href: `/tools/timezone?date=${date}`,
        },
      ]}
    >
      <Text fw="bold" className="xl2" {...textProps}>
        {readable}
      </Text>
    </RawCard>
  );
}
