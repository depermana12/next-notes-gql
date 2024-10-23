"use client";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/app-sidebar";
import { useEffect, useState } from "react";
import { isAuth } from "../utils/token";
import { redirect } from "next/navigation";
import BreadCrumbStatic from "@/components/BreadCrumbStatic";
import { Separator } from "@/components/ui/separator";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [user, setUser] = useState<{ username: string; email: string }>({
    username: "",
    email: "",
  });

  useEffect(() => {
    if (!isAuth()) {
      redirect("/signin");
    } else {
      const storedUser = localStorage.getItem("my-user");
      if (storedUser) setUser(JSON.parse(storedUser));
    }
  }, []);

  return (
    <SidebarProvider>
      <AppSidebar user={user} />
      <main className="relative flex min-h-svh flex-1 flex-col bg-background peer-data-[variant=inset]:min-h-[calc(100svh-theme(spacing.4))] md:peer-data-[variant=inset]:m-2 md:peer-data-[state=collapsed]:peer-data-[variant=inset]:ml-2 md:peer-data-[variant=inset]:ml-0 md:peer-data-[variant=inset]:rounded-xl md:peer-data-[variant=inset]:shadow">
        <header className="flex sticky top-0 bg-background h-16 shrink-0 items-center gap-2 border-b px-4">
          <SidebarTrigger />
          <Separator orientation="vertical" className="h-8" />
          <BreadCrumbStatic />
        </header>
        {children}
      </main>
    </SidebarProvider>
  );
}
