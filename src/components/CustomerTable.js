import React from "react";
import { useRewardsContext } from "../hooks/useRewardsContext";
import { useRewardsSelector } from "../hooks/useRewardsSelector";

const CustomerTableRow = ({
  customer: { id, name, email, phone },
  onClick,
}) => {
  const rewards = useRewardsSelector(id);

  return (
    <tr key={id} data-testid="customer" onClick={() => onClick(id)}>
      <td className="idColumn">{id}</td>
      <td>{name}</td>
      <td>{email}</td>
      <td>{phone}</td>
      <td>{rewards.totalRewardPoints}</td>
    </tr>
  );
};

export const CustomerTable = ({ onClick }) => {
  const { customers } = useRewardsContext();

  return (
    <>
      <table>
        <thead>
          <tr>
            <th>Customer ID</th>
            <th>Name</th>
            <th>Email</th>
            <th>Phone</th>
            <th>Rewards</th>
          </tr>
        </thead>
        <tbody>
          {customers.map((customer) => (
            <CustomerTableRow
              key={customer.id}
              customer={customer}
              onClick={onClick}
            />
          ))}
        </tbody>
      </table>
    </>
  );
};
