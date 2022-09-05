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
import BalanceSheetP from "./pages/balanceSheet";
import IncP from "./pages/incomeSheet";
import TrailBal from "./pages/trailBalance";
// import your route components too

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<DashboardP/>} />
        <Route path="/entries" element={<EntriesP/>} />
        <Route path="/ledger" element={<LedgerP/>} />
        <Route path="/gj" element={<GE/>} />
        <Route path="/trail" element={<TrailBal/>} />
        <Route path="/balSheet" element={<BalanceSheetP/>} />
        <Route path="/incomeSheet" element={<IncP/>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
