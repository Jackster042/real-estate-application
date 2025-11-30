"use client";

import { useEffect, useState } from "react";
import { NAVBAR_HEIGHT } from "@/lib/constants";
import Navbar from "@/components/shared/Navbar";
import { usePathname, useRouter } from "next/navigation";
import { useGetAuthUserQuery } from "@/state/api";
import { set } from "zod";

const Layout = ({ children }: { children: React.ReactNode }) => {
  const { data: authUser, isLoading: authLoading } = useGetAuthUserQuery();
  const router = useRouter();
  const pathname = usePathname();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (authUser) {
      const userRole = authUser.userRole?.toLowerCase();
      if (
        (userRole === "manager" && pathname.startsWith("/manager")) ||
        (userRole === "manager" && pathname === "/")
      ) {
        router.push("/managers/properties", { scroll: false });
      }
    } else {
      setIsLoading(false);
    }
  }, [authUser, pathname, router]);

  return (
    <div className="h-full w-full">
      <Navbar />
      <main
        className={`h-full flex w-full flex-col`}
        style={{ paddingTop: `${NAVBAR_HEIGHT}px` }}
      >
        {children}
      </main>
    </div>
  );
};

export default Layout;
