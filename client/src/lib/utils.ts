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
