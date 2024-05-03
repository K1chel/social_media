import { Toaster } from "sonner";

import { useTheme } from "@/providers/ThemeProvider";

export const ToastProvider = () => {
  const { theme } = useTheme();
  return <Toaster richColors theme={theme} />;
};
