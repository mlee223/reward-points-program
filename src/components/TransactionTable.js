import React from "react";
import { useRewardsContext } from "../hooks/useRewardsContext";

const TransactionTableRow = ({
  transaction: { id, customerId, purchaseAmount },
}) => {
  return (
    <tr key={id}>
      <td className="idColumn">{id}</td>
      <td>{customerId}</td>
      <td>{`$${purchaseAmount}`}</td>
    </tr>
  );
};

export const TransactionTable = () => {
  const { transactions } = useRewardsContext();

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
          <TransactionTableRow key={transaction.id} transaction={transaction} />
        ))}
      </tbody>
    </table>
  );
};
