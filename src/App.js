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
import { Backdrop, CircularProgress, createTheme } from "@mui/material";
import { useSelector } from "react-redux";

function App() {
  const newTheme = createTheme({ palette: { mode: "dark" } });
  const {loading} = useSelector(state => state.user)

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
      <Backdrop
        sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={loading}
        onClick={()=>{}}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
    </ThemeProvider>
  );
}

export default App;
