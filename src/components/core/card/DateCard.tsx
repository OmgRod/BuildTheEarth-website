import { toHumanDate, toHumanDateTime } from "@/util/date";
import { Text, TextProps } from "@mantine/core";
import { RawCard, RawCardProps } from "./RawCard";

import { IconCalendar } from "@tabler/icons-react";

export default function DateCard({
  date,
  withTime,
  withOpen = true,
  textProps,
  ...props
}: Omit<RawCardProps, "children"> & {
  date: string;
  textProps?: TextProps;
  withTime?: boolean;
  withOpen?: boolean;
}) {
  const readable = withTime ? toHumanDateTime(date) : toHumanDate(date);
  return (
    <RawCard
      {...props}
      copyText={readable}
      actions={
        withOpen
          ? [
              {
                label: "Open in Timezone Tool",
                icon: IconCalendar,
                href: `/tools/timezone?date=${date}`,
              },
            ]
          : []
      }
    >
      <Text fw="bold" className="xl2" {...textProps}>
        {readable}
      </Text>
    </RawCard>
  );
}
