import { EyeIcon, EyeOffIcon } from "lucide-react";
import { Button } from "../ui/button";

type Props = {
  showPassword: boolean;
  setShowPassword: React.Dispatch<React.SetStateAction<boolean>>;
  disabled?: boolean;
};

export const ShowPassword = ({
  setShowPassword,
  showPassword,
  disabled,
}: Props) => {
  const togglePassword = () => setShowPassword((prev) => !prev);

  return (
    <Button
      variant="outline"
      className="absolute right-0 h-full w-10 border-l top-0 flex items-center justify-center rounded-r-lg cursor-pointer transition text-muted-foreground hover:text-primary rounded-l-none"
      onClick={togglePassword}
      disabled={disabled}
      type="button"
    >
      <div>
        {showPassword ? (
          <EyeIcon className="w-4 h-4" />
        ) : (
          <EyeOffIcon className="w-4 h-4" />
        )}
      </div>
    </Button>
  );
};
