import { User } from "@/types/User";
import { authedFetcher } from "@/util/data";
import useSWR from "swr";

export const useUser = () => {
  const { data } = useSWR("/account");

  const user = {
    user: data,
  };
  return user;
};

export const getUser = async () => {
  return authedFetcher<User>("/account");
}