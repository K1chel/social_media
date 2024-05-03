import { Loader2Icon } from "lucide-react";

export const Loader = () => {
  return (
    <div className="fixed inset-0 h-full w-full bg-secondary">
      <div className="flex flex-col items-center justify-center h-full">
        <Loader2Icon className="text-muted-foreground h-12 w-12 animate-spin" />
      </div>
    </div>
  );
};
