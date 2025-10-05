import React from "react";
import { SWRConfig } from "swr";
import { createRoot } from "react-dom/client";

import App from "./App";
import { fetcher } from "./utils/fetcher";

import "./index.css";

async function setupMocking() {
  const { worker } = await import("./mocks/browser");
  return worker.start();
}

setupMocking().then(() => {
  const root = createRoot(document.getElementById("root"));
  root.render(
    <React.StrictMode>
      <SWRConfig value={{ provider: () => new Map(), fetcher: fetcher }}>
        <App />
      </SWRConfig>
    </React.StrictMode>
  );
});
