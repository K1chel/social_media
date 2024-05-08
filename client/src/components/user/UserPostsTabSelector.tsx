import { postTabSelections } from "@/constants";
import { cn } from "@/lib/utils";

type Props = {
  selectedTab: string;
  setSelectedTab: (value: string) => void;
};

export const UserPostsTabSelector = ({
  selectedTab,
  setSelectedTab,
}: Props) => {
  return (
    <div className="flex items-center justify-between w-full max-w-xl mx-auto border-b border-secondary/80">
      {postTabSelections.map((tab) => (
        <button
          key={tab.values}
          onClick={() => setSelectedTab(tab.values)}
          className={cn(
            "flex items-center justify-center w-full py-2 border-b-2",
            selectedTab === tab.values
              ? "border-secondary"
              : "border-transparent"
          )}
        >
          {tab.label}
        </button>
      ))}
    </div>
  );
};
