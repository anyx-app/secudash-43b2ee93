
import { Route, Routes } from "react-router-dom";
import { AppShell } from "./components/layout/AppShell";
import Dashboard from "./pages/Dashboard";

function App() {
  return (
    <Routes>
      <Route element={<AppShell />}>
        <Route path="/" element={<Dashboard />} />
        {/* Placeholders for future routes */}
        <Route path="/vulnerabilities" element={<div className="p-10 text-slate-400">Vulnerabilities Module Loading...</div>} />
        <Route path="/compliance" element={<div className="p-10 text-slate-400">Compliance Module Loading...</div>} />
        <Route path="/threats" element={<div className="p-10 text-slate-400">Threat Monitor Loading...</div>} />
      </Route>
    </Routes>
  );
}

export default App;
