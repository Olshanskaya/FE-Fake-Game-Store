import ReactDOM from "react-dom/client";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import "@smastrom/react-rating/style.css";

import App from "./App";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import { Toaster } from "react-hot-toast";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 5 * 60 * 1000,
      gcTime: 10 * 60 * 1000,
      refetchOnWindowFocus: false,
      retry: 3,
      refetchOnReconnect: true
    },
    mutations: {
      retry: 3,
      retryDelay: 1000
    }
  }
});

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <QueryClientProvider client={queryClient}>
    <BrowserRouter>
      <App />
      <ReactQueryDevtools initialIsOpen={false} />
      <Toaster
        position="bottom-left"
        toastOptions={{
          className: "",
          style: {
            background: "var(--gradient)",
            color: "#fff"
          }
        }}
      />
    </BrowserRouter>
  </QueryClientProvider>
);
