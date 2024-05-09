import { MenuIcon } from "lucide-react";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useMediaQuery } from "usehooks-ts";

import { Sheet, SheetContent, SheetTrigger } from "../ui/sheet";
import { Button } from "../ui/button";
import { Sidebar } from "./Sidebar";

export const MobileSidebar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const params = useParams();

  const isMobile = useMediaQuery("(max-width: 768px)");

  useEffect(() => {
    setIsOpen(false);
  }, [params]);

  useEffect(() => {
    setIsOpen(false);
  }, [isMobile]);

  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetTrigger asChild>
        <Button size="icon" variant="ghost">
          <MenuIcon />
        </Button>
      </SheetTrigger>
      <SheetContent side="left">
        <Sidebar isMobile />
      </SheetContent>
    </Sheet>
  );
};
