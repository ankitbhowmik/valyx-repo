import {
  Route,
  Routes,
  BrowserRouter
} from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import BottomNav from "./component/common/BottomNav";
import Stats from "./pages/Stats";
import Trending from "./pages/Trending";
import { ThemeProvider } from "@emotion/react";
import { createTheme } from "@mui/material";

function App() {
  const newTheme = createTheme({ palette: { mode: "dark" } });

  return (
    <ThemeProvider theme={newTheme}>
      <BrowserRouter>
        <div className="App">
          <main className="main-app">
            <Routes>
              <Route path="/" element={<h1>hello world</h1>} />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/stats" element={<Stats />} />
              <Route path="/trending" element={<Trending />} />
            </Routes>
          </main>
          <BottomNav />
        </div>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
