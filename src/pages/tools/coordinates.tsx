import {
  Alert,
  Button,
  Paper,
  SimpleGrid,
  Text,
  TextInput,
} from "@mantine/core";

import Anchor from "@/components/core/Anchor";
import Layout from "@/components/layout";
import { useState } from "react";

export default function Coordinates() {
  const [rlCoords, setRlCoords] = useState<string | undefined>();
  const [mcCoords, setMcCoords] = useState<string | undefined>();
  const [rlResult, setRlResult] = useState<any>();
  const [mcResult, setMcResult] = useState<any>();

  const handleConvertRl = async () => {
    const res = await fetch(
      process.env.NEXT_PUBLIC_SMYLER_API_URL +
        `/projection/fromGeo?geopos=${rlCoords}`,
    ).then((res) => res.json());
    setRlResult(res);
  };
  const handleConvertMc = async () => {
    const res = await fetch(
      process.env.NEXT_PUBLIC_SMYLER_API_URL +
        `/projection/toGeo?mcpos=${mcCoords}`,
    ).then((res) => res.json());
    setMcResult(res);
  };

  return (
    <Layout currentLink="/coordinates" tools>
      <SimpleGrid cols={2}>
        <Paper withBorder p="md" radius="sm">
          <Text size="xs" c="dimmed" tt="uppercase" fw="bold">
            Geographic to Minecraft
          </Text>
          <TextInput
            placeholder="Paste Coordinates..."
            mt="md"
            value={rlCoords}
            onChange={(e) => setRlCoords(e.target.value)}
          />
          <Button mt="sm" mb="lg" fullWidth onClick={() => handleConvertRl()}>
            Convert
          </Button>
          <Text size="xs" c="dimmed" tt="uppercase" fw="bold" mb="xs">
            Result
          </Text>
          <TextInput value={rlResult?.mc_positions[0]} />
        </Paper>

        <Paper withBorder p="md" radius="sm">
          <Text size="xs" c="dimmed" tt="uppercase" fw="bold">
            Minecraft to Geographic
          </Text>
          <TextInput
            placeholder="Paste Coordinates..."
            mt="md"
            value={mcCoords}
            onChange={(e) => setMcCoords(e.target.value)}
          />
          <Button mt="sm" mb="lg" fullWidth onClick={() => handleConvertMc()}>
            Convert
          </Button>{" "}
          <Text size="xs" c="dimmed" tt="uppercase" fw="bold" mb="xs">
            Result
          </Text>
          <TextInput value={mcResult?.geo_positions[0]} />
        </Paper>
      </SimpleGrid>
      <Alert title="Information" mt="md">
        This converter uses the SmyBteApi from SmylerMC, which you can find{" "}
        <Anchor href="https://github.com/SmylerMC/smybteapi" target="_blank">
          here
        </Anchor>
        . It uses the custom BuildTheEarth Projection and might result in some
        inaccuracies around the distorted areas. For more information about the
        projection we use, visit{" "}
        <Anchor
          href="https://resources.buildtheearth.net/s/docs/doc/introduction-to-bte-hbASQy80lW"
          target="_blank"
        >
          https://docs.buildtheearth.net
        </Anchor>
        .
      </Alert>
    </Layout>
  );
}
