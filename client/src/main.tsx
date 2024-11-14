
import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { Provider } from "react-redux";
import { persistor, store } from "./redux/store.ts";
import { Toaster } from "@/components/ui/toaster";
import { PersistGate } from "redux-persist/integration/react";
import { SocketProvider } from "./features/video/context/SocketProvider.tsx";

createRoot(document.getElementById("root")!).render(
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <SocketProvider> 
        <App />
        <Toaster />
      </SocketProvider>
    </PersistGate>
  </Provider>
);
