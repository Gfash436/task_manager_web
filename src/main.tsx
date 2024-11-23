import React from "react";
import ReactDOM from "react-dom/client";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import "./App.css";

import App from "./App.tsx";
import { Toaster } from "react-hot-toast";
import { ErrorBoundary } from "react-error-boundary";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      // staleTime: 0,
      staleTime: 60000,
    },
  },
});

function resetAppState() {
  localStorage.removeItem("accessToken");
  localStorage.removeItem("userDetails");
  localStorage.removeItem("forgotPasswordEmail");
  window.location.reload();
}

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <ErrorBoundary
      fallback={null}
      onReset={resetAppState}
      onError={resetAppState}
    >
      <QueryClientProvider client={queryClient}>
        <ReactQueryDevtools initialIsOpen={false} />

        <App />

        <Toaster
          position="top-center"
          gutter={12}
          containerStyle={{ margin: "80px" }}
          toastOptions={{
            success: { duration: 3000 },
            error: { duration: 5000 },
            style: {
              fontSize: "16px",
              maxWidth: "500px",
              padding: "16px 24px",
              backgroundColor: "var(--color-grey-0)",
              color: "var(--color-grey-700)",
            },
          }}
        />
      </QueryClientProvider>
    </ErrorBoundary>
  </React.StrictMode>
);
