import React from "react";
import { api } from "../data/api";
import { useRewards } from "../contexts/RewardsContext";
import { Customer } from "../components/Customer";

export const Customers = () => {
  const { customers, updateCustomers } = useRewards();

  const fetchData = React.useCallback(async () => {
    const { success, payload } = await api().fetchCustomers();
    if (success) {
      updateCustomers(payload.customers);
    }
  }, [updateCustomers]);

  React.useEffect(() => {
    fetchData();

    return () => {};
  }, []);

  return (
    <table>
      <thead>
        <tr>
          <th>Customer ID</th>
          <th>Name</th>
          <th>Email</th>
          <th>Phone</th>
        </tr>
      </thead>
      <tbody>
        {customers.map((customer) => (
          <Customer key={customer.id} customer={customer} />
        ))}
      </tbody>
    </table>
  );
};
