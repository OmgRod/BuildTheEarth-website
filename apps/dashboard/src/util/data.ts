import { getSession } from "./auth";

export default async function fetcher<T = {}>(route: string, ...props: any): Promise<T> {
  const res = await fetch(process.env.NEXT_PUBLIC_API_URL + route, {
    ...props,
  });
  return res.json();
}
export async function authedFetcher<T = {}>(
  route: string,
  ...props: any
): Promise<T> {
  const session = await getSession();

  if (!session) {
    return {} as T;
  }

  const res = await fetch(process.env.NEXT_PUBLIC_API_URL + route, {
    headers: {
      Authorization: `Bearer ${session?.accessToken}`,
    },
    ...props,
  });
  return res.json();
}

export async function globalFetcher<T = {}>(
  route: string,
  ...props: any
): Promise<T> {
  const res = await fetch(route, ...props);
  return res.json();
}
