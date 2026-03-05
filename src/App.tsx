import { Navigate, Route, Routes } from "react-router-dom";
import { Layout } from "./components/Layout";
import { ColorsPage } from "./pages/ColorsPage";
import { ComponentsPage } from "./pages/ComponentsPage";
import { TypographyPage } from "./pages/TypographyPage";

export default function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route index element={<Navigate to="/colors" replace />} />
        <Route path="/colors" element={<ColorsPage />} />
        <Route path="/typography" element={<TypographyPage />} />
        <Route path="/components" element={<ComponentsPage />} />
      </Route>
    </Routes>
  );
}
