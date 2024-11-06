import { User } from "@/types/User";
import { authedFetcher } from "@/util/data";

export const getUser = async () => {
	return authedFetcher<User>('/account');
};
