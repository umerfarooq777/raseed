import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

import AddRecords from "./components/addRecord";
import GeneralRecords from "./components/generalRecords";
import Ledger from "./components/Ledger";
import NavbarApp from "./components/navbar";
import Transactions from "./components/transactions";

import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import GE from "./pages/GE";
import DashboardP from "./pages/dashboard";
import LedgerP from "./pages/Ledger";
import EntriesP from "./pages/entries";
// import your route components too

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<DashboardP/>} />
        <Route path="/entries" element={<EntriesP/>} />
        <Route path="/ledger" element={<LedgerP/>} />
        <Route path="/gj" element={<GE/>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
