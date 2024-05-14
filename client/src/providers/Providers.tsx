import { BrowserRouter } from "react-router-dom";
import { RecoilRoot } from "recoil";

import { AuthProvider } from "@/providers/AuthProvider";
import { ModalProvider } from "@/providers/ModalProvider";
import { ThemeProvider } from "@/providers/ThemeProvider";
import { ToastProvider } from "@/providers/ToastProvider";
import { CreatePostModal } from "@/components/modals/CreatePostModal";

type Props = {
  children: React.ReactNode;
};

export const Providers = ({ children }: Props) => {
  return (
    <BrowserRouter>
      <RecoilRoot>
        <AuthProvider>
          <ThemeProvider>
            {children}
            <ToastProvider />
            <ModalProvider />
            <CreatePostModal />
          </ThemeProvider>
        </AuthProvider>
      </RecoilRoot>
    </BrowserRouter>
  );
};
