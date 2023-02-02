import React from "react";

export const Customer = ({ customer: { id, name, email, phone } }) => {
  return (
    <tr key={id}>
      <td>{id}</td>
      <td>{name}</td>
      <td>{email}</td>
      <td>{phone}</td>
    </tr>
  );
};
