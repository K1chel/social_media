import { HomePage } from "@/pages/HomePage";
import { LoginPage } from "@/pages/LoginPage";
import { NotificationsPage } from "@/pages/NotificationsPage";
import { PostPage } from "@/pages/PostPage";
import { ProfilePage } from "@/pages/ProfilePage";
import { RegisterPage } from "@/pages/RegisterPage";
import { UpdateProfilePage } from "@/pages/UpdateProfilePage";

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
  {
    path: "/profile/:username/update",
    element: UpdateProfilePage,
  },
  {
    path: "/post/:postId",
    element: PostPage,
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
