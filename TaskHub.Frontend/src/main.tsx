import React from "react";
import ReactDOM from "react-dom/client";

import App from "./App.tsx";
import "@/styles/globals.css";
import { HeroUIProvider } from "@heroui/system";

ReactDOM.createRoot(document.getElementById("root")!).render(
    <React.StrictMode>
        <HeroUIProvider>
            <App />
        </HeroUIProvider>
    </React.StrictMode>,
);
