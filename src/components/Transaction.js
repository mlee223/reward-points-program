import React from "react";

export const Transaction = ({
  transaction: { id, customerId, purchaseAmount },
}) => {
  return (
    <tr key={id}>
      <td>{id}</td>
      <td>{customerId}</td>
      <td>{`$${purchaseAmount}`}</td>
    </tr>
  );
};
