import React from "react";
import { OVER_100_DEFAULT, OVER_50_DEFAULT } from "../types/points";

export const RewardsContext = React.createContext({
  customers: [],
  transactions: [],
  rewards: [],
  updateCustomers: (value) => {},
  updateTransactions: (value) => {},
});

export const RewardsProvider = React.memo((props) => {
  const [customers, setCustomers] = React.useState([]);
  const [transactions, setTransactions] = React.useState([]);
  const [rewards, setRewards] = React.useState([]);

  const updateCustomers = React.useCallback(
    (value) => {
      setCustomers(value);
    },
    [setCustomers]
  );

  const updateTransactions = React.useCallback(
    (value) => {
      setTransactions(value);
    },
    [setTransactions]
  );

  React.useEffect(() => {
    let temp = {};
    transactions.forEach((t) => {
      let month = `${new Date(t.createdAt).toLocaleString("default", {
        month: "long",
      })} ${new Date(t.createdAt).getUTCFullYear()}`;

      let points =
        t.purchaseAmount <= 50
          ? 0
          : t.purchaseAmount <= 100
          ? (t.purchaseAmount - 50) * OVER_50_DEFAULT
          : (t.purchaseAmount - 100) * OVER_100_DEFAULT + 50 * OVER_50_DEFAULT;

      if (points > 0) {
        if (temp[t.customerId]) {
          temp[t.customerId].totalRewardPoints += points;
          if (temp[t.customerId].rewardPointsByMonth[month]) {
            temp[t.customerId].rewardPointsByMonth[month] += points;
          } else {
            temp[t.customerId].rewardPointsByMonth[month] = points;
          }
        } else {
          temp[t.customerId] = {
            totalRewardPoints: points,
            rewardPointsByMonth: {
              [`${month}`]: points,
            },
          };
        }
      }
    });
    setRewards(temp);
  }, [transactions, setRewards]);

  return (
    <RewardsContext.Provider
      value={{
        customers,
        transactions,
        rewards,
        updateCustomers,
        updateTransactions,
      }}
    >
      {props.children}
    </RewardsContext.Provider>
  );
});
