import ReactDOM from "react-dom/client";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import '@smastrom/react-rating/style.css'

import App from "./App";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import { Toaster } from "react-hot-toast";

const queryClient = new QueryClient();

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
            background: 'var(--gradient)',
            color: "#fff"
          }
        }}
      />
    </BrowserRouter>
  </QueryClientProvider>
);
