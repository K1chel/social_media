import { Toaster } from "sonner";
import { BrowserRouter } from "react-router-dom";

import { ModalProvider } from "@/providers/ModalProvider";
import { ThemeProvider } from "@/providers/ThemeProvider";

type Props = {
  children: React.ReactNode;
};

export const Providers = ({ children }: Props) => {
  return (
    <BrowserRouter>
      <ThemeProvider>
        {children}
        <Toaster />
        <ModalProvider />
      </ThemeProvider>
    </BrowserRouter>
  );
};
