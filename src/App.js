import Home from "./pages/Home";
import { CssBaseline } from "@mui/material";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import CoinPage from "./pages/CoinPage";

function App() {
  return (
    <>
      <CssBaseline />
      <Router>
        <Header />
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route exact path="/coin/:id" element={<CoinPage />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
