import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { RewardsProvider } from "./contexts/RewardsContext";
import { Home } from "./pages/Home";

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <RewardsProvider>
          <Home />
        </RewardsProvider>
      </header>
    </div>
  );
}

export default App;
