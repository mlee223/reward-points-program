import "./App.css";
import { RewardsProvider } from "./contexts/RewardsContext";
import { Customers } from "./pages/CustomerList";
import { Transactions } from "./pages/TransactionList";

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <RewardsProvider>
          <Customers />
          <Transactions />
        </RewardsProvider>
      </header>
    </div>
  );
}

export default App;
