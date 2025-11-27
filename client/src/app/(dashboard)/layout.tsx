"use client";

import Navbar from "@/components/shared/Navbar";
import { Sidebar, SidebarProvider } from "@/components/ui/sidebar";
import { NAVBAR_HEIGHT } from "@/lib/constants";
import { useGetAuthUserQuery } from "@/state/api";
import { usePathname, useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

const DashboardLayout = () => {
  const { data: authUser, isLoading: authLoading } = useGetAuthUserQuery();
  const router = useRouter();
  const pathname = usePathname();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (authUser) {
      const userRole = authUser.userRole?.toLowerCase();
      if (
        (userRole === "manager" && pathname.startsWith("/manager")) ||
        (userRole === "tenant" && pathname.startsWith("/tenant"))
      ) {
        router.push(
          userRole === "manager"
            ? "/managers/properties"
            : "/tenants/favorites",
          { scroll: false }
        );
      }
    } else {
      setIsLoading(false);
    }
  }, [authUser, pathname, router]);

  //   TODO: ADD COMPONENTS FOR THESE 2 OPTIONS
  if (authLoading || isLoading) return <div>Loading...</div>;
  if (!authUser) return null;

  return (
    <SidebarProvider>
      <div className="w-full min-h-screen bg-primary-100">
        <Navbar />
        <div style={{ marginTop: `${NAVBAR_HEIGHT}px` }}>
          <main className="flex">
            <Sidebar />
            <div className="flex-grow transition-all duration-300">
              {/* {children} */}
            </div>
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
};

export default DashboardLayout;
