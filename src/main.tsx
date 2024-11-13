import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.less";
import App from "./App.tsx";
import { ConfigProvider } from "antd";
import { themeConfig } from "./lib/style/theme.ts";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ConfigProvider theme={themeConfig}>
      <App />
    </ConfigProvider>
  </StrictMode>
);
