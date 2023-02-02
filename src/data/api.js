const data = require("./db.json");

export function api() {
  return {
    fetchCustomers: async () => {
      return new Promise((resolve) => {
        setTimeout(() => {
          return resolve({
            success: true,
            payload: {
              customers: data["customers"],
            },
          });
        }, 0);
      });
    },
    fetchTransactions: async () => {
      return new Promise((resolve) => {
        setTimeout(() => {
          return resolve({
            success: true,
            payload: {
              transactions: data["transactions"],
            },
          });
        }, 0);
      });
    },
  };
}
