import { useState } from "react";
import { Outlet } from "react-router-dom";
import { ProfileSidebar } from "../components/sidebar/ProfileSidebar";
import { Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";

export const ProfileLayout = () => {
  const [openSheet, setOpen] = useState(false);

  return (
    <div className="relative min-h-screen">
      <div className="z-50 sm:hidden w-full sticky top-0  bg-background border-b p-4">
        <Sheet open={openSheet} onOpenChange={setOpen}>
          <SheetTrigger>
            <Button variant="ghost" size="icon" className="sm:hidden">
              <Menu className="h-6 w-6" />
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="w-[280px] sm:hidden pt-2 ">
            <ProfileSidebar onItemClick={() => setOpen(false)} />
          </SheetContent>
        </Sheet>
      </div>

      <div className="flex">
        <div className="hidden sm:block w-1/4 min-h-screen border-r p-4">
          <ProfileSidebar />
        </div>
        <div className=" overflow-hidden w-full sm:w-3/4 flex-1 p-4 sm:p-8">
          <Outlet />
        </div>
      </div>
    </div>
  );
};
