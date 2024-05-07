import { FacebookIcon, GithubIcon, LinkedinIcon } from "lucide-react";
import { Button } from "../ui/button";

export const Footer = () => {
  return (
    <footer className="max-w-6xl mx-auto px-3 w-full flex items-center justify-between xl:flex-row flex-col gap-y-2">
      <span className="text-sm font-medium">
        &copy; {new Date().getFullYear()} Social Media. All rights reserved.
      </span>
      <div className="flex items-center gap-x-2">
        <Button size="sm" variant="ghost">
          Privacy Policy
        </Button>
        <Button size="sm" variant="ghost">
          Terms of Service
        </Button>
        <Button size="sm" variant="ghost">
          Cookie Policy
        </Button>
      </div>
      <div className="flex items-center gap-x-1">
        <Button size="icon" variant="ghost">
          <GithubIcon className="w-4 h-4" />
        </Button>
        <Button size="icon" variant="ghost">
          <FacebookIcon className="w-4 h-4" />
        </Button>
        <Button size="icon" variant="ghost">
          <LinkedinIcon className="w-4 h-4" />
        </Button>
      </div>
    </footer>
  );
};
