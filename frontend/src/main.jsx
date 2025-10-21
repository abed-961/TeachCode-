import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";

// import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

createRoot(document.getElementById("root")).render(
    <StrictMode>
        {/* <QueryClientProvider client={new QueryClient()}> */}
        <App style={{ width: "100%" }} />
        {/* </QueryClientProvider> */}
    </StrictMode>
);
