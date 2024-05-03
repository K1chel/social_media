import { BrowserRouter } from "react-router-dom";

import { AuthProvider } from "@/providers/AuthProvider";
import { ModalProvider } from "@/providers/ModalProvider";
import { ThemeProvider } from "@/providers/ThemeProvider";
import { ToastProvider } from "@/providers/ToastProvider";

type Props = {
  children: React.ReactNode;
};

export const Providers = ({ children }: Props) => {
  return (
    <BrowserRouter>
      <AuthProvider>
        <ThemeProvider>
          {children}
          <ToastProvider />
          <ModalProvider />
        </ThemeProvider>
      </AuthProvider>
    </BrowserRouter>
  );
};
