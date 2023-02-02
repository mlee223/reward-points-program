import React from "react";
import { useRewardsSelector } from "../hooks/useRewardsSelector";

const RewardTableRow = ({ reward: { month, points } }) => {
  return (
    <tr>
      <td>{month}</td>
      <td>{points}</td>
    </tr>
  );
};

export const RewardTable = ({ customerId }) => {
  const { totalRewardPoints, rewardPointsByMonth } =
    useRewardsSelector(customerId);

  return (
    <>
      <div>{`Total Rewards Points: ${totalRewardPoints || 0}`}</div>
      {totalRewardPoints > 0 && (
        <table>
          <thead>
            <tr>
              <th>Month</th>
              <th>Reward Points Earned</th>
            </tr>
          </thead>
          <tbody>
            {Object.keys(rewardPointsByMonth).map((month) => (
              <RewardTableRow
                key={month}
                reward={{ month, points: rewardPointsByMonth[month] }}
              />
            ))}
          </tbody>
        </table>
      )}
    </>
  );
};
