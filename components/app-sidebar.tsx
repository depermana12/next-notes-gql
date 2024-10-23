"use client";

import * as React from "react";
import { BookOpen, Settings2 } from "lucide-react";

import { NavMain } from "@/components/nav-main";
import { NavUser } from "@/components/nav-user";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from "@/components/ui/sidebar";
import HeaderLogo from "./HeaderLogo";
import { removeToken } from "@/app/utils/token";

export function AppSidebar({
  user,
  ...props
}: {
  user: { username: string; email: string };
} & React.ComponentProps<typeof Sidebar>) {
  const handleSignOut = () => {
    removeToken();
  };

  const data = {
    navMain: [
      {
        title: "Documentation",
        url: "#",
        icon: BookOpen,
        items: [
          {
            title: "Introduction",
            url: "#",
          },
          {
            title: "Get Started",
            url: "#",
          },
          {
            title: "Tutorials",
            url: "#",
          },
        ],
      },
      {
        title: "Settings",
        url: "#",
        icon: Settings2,
        items: [
          {
            title: "Profile",
            url: "#",
          },
          {
            title: "Sign Out",
            url: "#",
            event: handleSignOut,
          },
        ],
      },
    ],
  };

  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <HeaderLogo />
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={user} />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
