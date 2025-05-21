import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
// import disableDevtool from "disable-devtool";

const queryClient = new QueryClient();

// // Disable DevTools
// disableDevtool({
//   disableMenu: true, // disables right-click
//   clearLog: true, // clears console logs
//   url: "about:blank", // redirect URL if DevTools detected
// });

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <App />
    </QueryClientProvider>
  </StrictMode>,
);
