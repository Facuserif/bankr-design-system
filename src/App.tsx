import { Navigate, Route, Routes } from "react-router-dom";
import { Layout } from "./components/Layout";
import { ColorsPage } from "./pages/ColorsPage";
import { ComponentsPage } from "./pages/ComponentsPage";
import { AgentConfigurationPatternPage } from "./pages/patterns/AgentConfigurationPatternPage";
import { SettingsPanelPatternPage } from "./pages/patterns/SettingsPanelPatternPage";
import { TokenCreationDialogPatternPage } from "./pages/patterns/TokenCreationDialogPatternPage";
import { TypographyPage } from "./pages/TypographyPage";

export default function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route index element={<Navigate to="/colors" replace />} />
        <Route path="/colors" element={<ColorsPage />} />
        <Route path="/typography" element={<TypographyPage />} />
        <Route path="/components" element={<ComponentsPage />} />
        <Route path="/patterns" element={<Navigate to="/patterns/token-creation-dialog" replace />} />
        <Route path="/patterns/token-creation-dialog" element={<TokenCreationDialogPatternPage />} />
        <Route path="/patterns/agent-configuration" element={<AgentConfigurationPatternPage />} />
        <Route path="/patterns/settings-panel" element={<SettingsPanelPatternPage />} />
      </Route>
    </Routes>
  );
}
