import { createBrowserRouter } from "react-router";
import { Dashboard } from "./components/Dashboard";
import { ChatAssistant } from "./components/ChatAssistant";
import { Universities } from "./components/Universities";
import { Profile } from "./components/Profile";
import { Layout } from "./components/Layout";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: Layout,
    children: [
      { index: true, Component: Dashboard },
      { path: "chat", Component: ChatAssistant },
      { path: "universities", Component: Universities },
      { path: "profile", Component: Profile },
    ],
  },
]);
