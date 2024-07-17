import Layout from "@/components/layout";
import useAvailableBuildTeam from "@/hooks/useAvailableBuildTeam";
import { useRouter } from "next/router";
import useSWR from "swr";

export default function Home() {
  const router = useRouter();
  const userId = router.query.id;
  const { activeBuildTeam } = useAvailableBuildTeam();
  const { data, isLoading } = useSWR(`/users/${userId}?asTeam=true`);

  return (
    <Layout currentLink="/members" team>
      {userId}
    </Layout>
  );
}
