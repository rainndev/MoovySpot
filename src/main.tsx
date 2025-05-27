import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/sonner";

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
      <Toaster
        offset={{
          top: "8rem",
          right: "2rem",
          bottom: "auto",
          left: "auto",
        }}
        toastOptions={{
          unstyled: true,
          duration: 1500,
          classNames: {
            toast:
              "!bg-logo-white/5 text-white  border border-logo-white/10 p-4 px-6 rounded-sm shadow-lg z-20 backdrop-blur-sm",
            title: "!text-[clamp(.85rem,3vw,1rem)]",
            description: "!text-logo-white/50 !text-[clamp(.75rem,3vw,.9rem)]",
          },
        }}
      />
    </QueryClientProvider>
  </StrictMode>,
);
