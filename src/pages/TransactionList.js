import React from "react";
import { api } from "../data/api";
import { useRewards } from "../contexts/RewardsContext";
import { Transaction } from "../components/Transaction";

export const Transactions = () => {
  const { transactions, updateTransactions } = useRewards();

  const fetchData = React.useCallback(async () => {
    const { success, payload } = await api().fetchTransactions();
    if (success) {
      updateTransactions(payload.transactions);
    }
  }, [updateTransactions]);

  React.useEffect(() => {
    fetchData();

    return () => {};
  }, []);

  return (
    <table>
      <thead>
        <tr>
          <th>Transaction ID</th>
          <th>Customer ID</th>
          <th>Price</th>
        </tr>
      </thead>
      <tbody>
        {transactions.map((transaction) => (
          <Transaction key={transaction.id} transaction={transaction} />
        ))}
      </tbody>
    </table>
  );
};
