import { RouterProvider } from "react-router-dom";
import routes from "./router/router";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { SocketProvider } from "./context/SocketContext";
const App = () => {
  return (
    <GoogleOAuthProvider clientId="359454866408-q0i1ivu216pqqvvuthue12204grnsg1n.apps.googleusercontent.com">
      <SocketProvider>
        <RouterProvider router={routes} />
      </SocketProvider>
    </GoogleOAuthProvider>
  );
};

export default App;
