import React from "react";

export const RewardsContext = React.createContext({
  customers: [],
  transactions: [],
  rewards: [],
  updateCustomers: (value) => {},
  updateTransactions: (value) => {},
});

export const useRewards = () => React.useContext(RewardsContext);

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

  React.useEffect(() => {}, [rewards, setRewards]);

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
