
import React from "react";
import { createRoot } from "react-dom/client";
import App from "./App";
import "./assets/bootstrap.min.css";
import "./assets/bootstrap-icons.min.css";
import "./app.css";

createRoot(document.getElementById("root")).render(<App />);

if ("serviceWorker" in navigator) {
    window.addEventListener("load", () => {
        navigator.serviceWorker.register("/sw.js")
            .then(() => console.log("Service Worker registered"))
            .catch(error => console.log("Service Worker error:", error));
    });
}
