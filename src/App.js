import "./App.css";
import Navs from "./Navs";
import { DarkModeContextProvider } from "./Components/Context/darkmode";
import { UserContextProvider } from "./Components/Context/UserContext";

function App() {
  return (
    <div className="App">
      <UserContextProvider>
        <DarkModeContextProvider>
          <Navs />
        </DarkModeContextProvider>
      </UserContextProvider>
    </div>
  );
}

export default App;
