import React from "react";

// import CustomerTable from "../components/Tables/CustomerTable";
import { api } from "../data/api";
import { Customer } from "../components/Customer";

export const Customers = () => {
  const [customers, setCustomers] = React.useState([]);

  const fetchData = React.useCallback(async () => {
    const { success, payload } = await api().fetchCustomers();
    if (success) {
      setCustomers(payload.customers);
    }
  }, [setCustomers]);

  React.useEffect(() => {
    fetchData();

    return () => {};
  }, [setCustomers]);

  // return <CustomerTable customers={customers} />;
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
        {/* iterate through the customers array and render a unique Customer component for each customer object in the array */}
        {customers.map((customer) => (
          <Customer key={customer.id} customer={customer} />
        ))}
      </tbody>
    </table>
  );
};
