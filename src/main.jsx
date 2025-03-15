import { RouterProvider } from "react-router-dom";
import { createRoot } from "react-dom/client";
import { StrictMode } from "react";
import router from "./routes";

createRoot(document.getElementById("root")).render(
  <RouterProvider
    router={router}
    future={{
      v7_startTransition: true,
    }}
  />,
);
