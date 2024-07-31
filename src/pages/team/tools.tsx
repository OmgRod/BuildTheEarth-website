import { Button, Grid, GridCol, Text } from "@mantine/core";

import { RawCard } from "@/components/core/card/RawCard";
import Layout from "@/components/layout";
import useAvailableBuildTeam from "@/hooks/useAvailableBuildTeam";
import { useState } from "react";

export default function Home() {
  const { activeBuildTeam } = useAvailableBuildTeam();
  const routes = ["en", "de", "fr", "nl", "no", "ru", "zh"].flatMap((lang) =>
    [
      "/teams/[team]",
      "/teams",
      "/teams/[team]/apply",
      "/teams/[team]/manage/review",
      "/teams/[team]/manage/apply",
      "/teams/[team]/manage/images",
      "/teams/[team]/manage/review",
      "/teams/[team]/manage/members",
      "/teams/[team]/manage/settings",
    ].map(
      (route) =>
        "/" + lang + route.replaceAll("[team]", activeBuildTeam?.slug || "")
    )
  );
  const [loading, setLoading] = useState(false);

  const handleRerender = async () => {
    setLoading(true);
    await fetch(`/api/rerender?routes=${JSON.stringify(routes)}`).then((res) =>
      setLoading(false)
    );
  };

  return (
    <Layout currentLink="/team/tools" currentSpace="team">
      <Grid>
        <GridCol span={3}>
          <RawCard
            id="rerender"
            title="Rerender Team Pages"
            withCopy={false}
            withEdit={false}
          >
            <Text mb="sm">
              In case you see old information on the website that you have
              already changed, you can press this button. After about 10 seconds
              all information should be up to date again.
              <br />
              Please dont spam this button, it will reload {routes.length}{" "}
              pages.
            </Text>
            <Button
              fullWidth
              mt="sm"
              onClick={() => handleRerender()}
              loading={loading}
            >
              Rerender
            </Button>
          </RawCard>
        </GridCol>
      </Grid>
    </Layout>
  );
}
