import {
  Button,
  Container,
  Paper,
  SimpleGrid,
  Text,
  TextInput,
} from "@mantine/core";

import DynamicIcon from "@/components/core/DynamicIcon";
import { IconError404 } from "@tabler/icons-react";
import Layout from "@/components/layout";
import { useState } from "react";

interface Category {
  id: string;
  name: string;
  icon: string;
}

export default function Assets() {
  const [categoriesResult, setCategoriesResult] = useState<Category[]>([]);

  const handleGetCategories = async () => {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_ASSET_SYSTEM_API}/assets/categories`
    ).then((res) => res.json());
    setCategoriesResult(res);
  };

  return (
    <Layout currentLink="/tools/assets" currentSpace="me">
      <Button onClick={handleGetCategories} fullWidth={false}>
        Get Categories
      </Button>
      <Paper withBorder p="md" radius="sm">
        <SimpleGrid cols={1}>
          {categoriesResult.map((category) => {
            return (
              <Button key={category.id} radius="lg">
                <h2>{category.name}</h2>
                <DynamicIcon icon={category.icon} fallback={IconError404} />
              </Button>
            );
          })}
        </SimpleGrid>
      </Paper>
    </Layout>
  );
}
