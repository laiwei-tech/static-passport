import { RouterProvider } from "react-router-dom";
import "./App.less";
import { router } from "./lib/router";

function App() {
  return <RouterProvider router={router} />;
}

export default App;
