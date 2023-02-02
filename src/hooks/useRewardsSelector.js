import { useRewardsContext } from "./useRewardsContext";

export const useRewardsSelector = (customerId) => {
  const { rewards } = useRewardsContext();
  return rewards[customerId] || {};
};
