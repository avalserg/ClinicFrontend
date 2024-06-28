import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App/App";
import { ThemeProvider } from "@/App/Providers/ThemeProvider";
import { StoreProvider } from "@/App/Providers/StoreProvider";
import "./Shared/Config/i18n/i18n";
import "@/App/Styles/index.scss";
import { ErrorBoundary } from "./App/Providers/ErrorBoundary";
import { ForceUpdateProvider } from "./Shared/lib/render/forceUpdate";

const container = document.getElementById("root");
if (!container) {
  throw new Error("The element #root wasn't found");
}
const root = createRoot(container);
root.render(
  <BrowserRouter>
      <ErrorBoundary>
    <StoreProvider>
        <ForceUpdateProvider>
          <ThemeProvider>
            <App />
          </ThemeProvider>
        </ForceUpdateProvider>
    </StoreProvider>
      </ErrorBoundary>
  </BrowserRouter>,
);
