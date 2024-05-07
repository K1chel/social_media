import { HomePage } from "@/pages/HomePage";
import { LoginPage } from "@/pages/LoginPage";
import { NotificationsPage } from "@/pages/NotificationsPage";
import { ProfilePage } from "@/pages/ProfilePage";
import { RegisterPage } from "@/pages/RegisterPage";

export const privateRoutes = [
  {
    path: "/",
    element: HomePage,
  },
  {
    path: "/notifications",
    element: NotificationsPage,
  },
  {
    path: "/profile/:username",
    element: ProfilePage,
  },
];

export const publicRoutes = [
  {
    path: "/login",
    element: LoginPage,
  },
  {
    path: "/register",
    element: RegisterPage,
  },
];
