import { Buffer } from "buffer";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { WalletContextProvider } from "./contexts/WalletContext.tsx";
import App from "./App.tsx";

window.Buffer = Buffer;
import "./index.css";

const queryClient = new QueryClient();

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <WalletContextProvider>
        <App />
      </WalletContextProvider>
    </QueryClientProvider>
  </StrictMode>
);
