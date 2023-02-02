import React from "react";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import { api } from "../data/api";
import { useRewardsContext } from "../hooks/useRewardsContext";
import { CustomerTable } from "../components/CustomerTable";
import { RewardTable } from "../components/RewardTable";

export const Home = () => {
  const { updateCustomers, updateTransactions } = useRewardsContext();

  const [selectedCustomer, setSelectedCustomer] = React.useState(undefined);
  const handleClose = () => setSelectedCustomer(undefined);
  const handleShow = (customerId) => setSelectedCustomer(customerId);

  const fetchCustomersData = React.useCallback(async () => {
    const { success, payload } = await api().fetchCustomers();
    if (success) {
      updateCustomers(payload.customers);
    }
  }, [updateCustomers]);

  const fetchTransactionsData = React.useCallback(async () => {
    const { success, payload } = await api().fetchTransactions();
    if (success) {
      updateTransactions(payload.transactions);
    }
  }, [updateTransactions]);

  React.useEffect(() => {
    fetchCustomersData();
    fetchTransactionsData();

    return () => {};
  }, [fetchCustomersData, fetchTransactionsData]);

  return (
    <>
      <CustomerTable onClick={handleShow} />

      <Modal
        show={selectedCustomer !== undefined}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>Rewards</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <RewardTable customerId={selectedCustomer} />
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};
