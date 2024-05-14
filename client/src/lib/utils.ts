import {
  Linkedin,
  Github,
  Link,
  TwitterIcon,
  CodeXmlIcon,
  BriefcaseBusinessIcon,
} from "lucide-react";
import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function getIconAndLabelFromLink(link: string) {
  let icon = Link;
  let label = "Link";

  switch (true) {
    case link.includes("linkedin"):
      icon = Linkedin;
      label = "Linkedin";
      break;
    case link.includes("portfolio"):
      icon = BriefcaseBusinessIcon;
      label = "Portfolio";
      break;
    case link.includes("medium"):
      icon = CodeXmlIcon;
      label = "Medium";
      break;
    case link.includes("twitter"):
      icon = TwitterIcon;
      label = "Twitter(X)";
      break;
    case link.includes("github"):
      icon = Github;
      label = "Github";
      break;
  }

  return { icon, label };
}

export function timeSince(dateString: string) {
  const date = new Date(dateString);
  const seconds = Math.floor((new Date().getTime() - date.getTime()) / 1000);

  let interval = seconds / 31536000;

  if (interval > 1) {
    return Math.floor(interval) + "y";
  }
  interval = seconds / 2592000;
  if (interval > 1) {
    return Math.floor(interval) + "mo";
  }
  interval = seconds / 604800;
  if (interval > 1) {
    return Math.floor(interval) + "w";
  }
  interval = seconds / 86400;
  if (interval > 1) {
    return Math.floor(interval) + "d";
  }
  interval = seconds / 3600;
  if (interval > 1) {
    return Math.floor(interval) + "h";
  }
  interval = seconds / 60;
  if (interval > 1) {
    return Math.floor(interval) + "m";
  }
  return Math.floor(seconds) + "s";
}
