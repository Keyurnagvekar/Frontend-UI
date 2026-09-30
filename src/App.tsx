import { Navigate, Route, Routes } from "react-router-dom";
import Layout from "./components/Layout";
import Overview from "./pages/Overview";
import Servers from "./pages/Servers";
import Tools from "./pages/Tools";
import Prompts from "./pages/Prompts";
import Integrations from "./pages/Integrations";
import Services from "./pages/Services";
import Logs from "./pages/Logs";

export default function App() {
  return <Routes>
    <Route element={<Layout />}>
      <Route path="/" element={<Overview />} />
      <Route path="/servers" element={<Servers />} />
      <Route path="/tools" element={<Tools />} />
      <Route path="/prompts" element={<Prompts />} />
      <Route path="/integrations" element={<Integrations />} />
      <Route path="/services" element={<Services />} />
      <Route path="/logs" element={<Logs />} />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Route>
  </Routes>;
}
