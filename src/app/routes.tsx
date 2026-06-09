import { createBrowserRouter } from "react-router";
import { Dashboard } from "./components/Dashboard";
import { ChatAssistant } from "./components/ChatAssistant";
import { Universities } from "./components/Universities";
import { Profile } from "./components/Profile";
import { Layout } from "./components/Layout";
import { Landing } from "./components/Landing";

export const router = createBrowserRouter([
  { path: "/", Component: Landing },
  {
    path: "/",
    Component: Layout,
    children: [
      { path: "dashboard", Component: Dashboard },
      { path: "chat", Component: ChatAssistant },
      { path: "universities", Component: Universities },
      { path: "profile", Component: Profile },
    ],
  },
]);
