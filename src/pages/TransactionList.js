import React from "react";
import { api } from "../data/api";
import { Transaction } from "../components/Transaction";

export const Transactions = () => {
  const [transactions, setTransactions] = React.useState([]);

  const fetchData = React.useCallback(async () => {
    const { success, payload } = await api().fetchTransactions();
    if (success) {
      setTransactions(payload.transactions);
    }
  }, [setTransactions]);

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
