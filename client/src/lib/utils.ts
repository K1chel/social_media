import { Linkedin, Github, Link } from "lucide-react";
import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function getIconFromLink(link: string) {
  switch (true) {
    case link.includes("linkedin"):
      return Linkedin;
    case link.includes("github"):
      return Github;
    default:
      return Link;
  }
}
