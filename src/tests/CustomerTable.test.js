import { render, screen, waitFor } from "@testing-library/react";
import { Home } from "../pages/Home";

test("Customer Table", async () => {
  render(<Home />);

  const customerList = await waitFor(() => screen.findAllByTestId("customer"));
  expect(customerList).toHaveLength(5);
});
