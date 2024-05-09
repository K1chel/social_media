import { BellIcon, HomeIcon } from "lucide-react";

export const sidebarLinks = [
  {
    label: "Home",
    href: "/",
    icon: HomeIcon,
  },
  {
    label: "Notifications",
    href: "/notifications",
    icon: BellIcon,
  },
] as const;

export const postTabSelections = [
  {
    label: "Posts",
    values: "posts",
  },
  {
    label: "Liked",
    values: "liked",
  },
  {
    label: "Saved",
    values: "saved",
  },
] as const;

export const MAX_BIO_CHARACTERS = 200;
