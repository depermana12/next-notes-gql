"use client";

import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";

export function NavUser({
  user,
}: {
  user: {
    username: string;
    email: string;
    // avatar: string;
  };
}) {
  const initial =
    user.username.split(" ").length > 1
      ? user.username.split(" ")[0][0] + user.username.split(" ")[1][0]
      : user.username.slice(0, 2);

  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <SidebarMenuButton
          size="lg"
          className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
        >
          <Avatar className="h-8 w-8 rounded-lg">
            {/* <AvatarImage src={user.avatar} alt={user.name} /> */}
            <AvatarFallback className="rounded-lg">{initial}</AvatarFallback>
          </Avatar>
          <div className="grid flex-1 text-left text-sm leading-tight">
            <span className="truncate font-semibold">{user.username}</span>
            <span className="truncate text-xs">{user.email}</span>
          </div>
        </SidebarMenuButton>
      </SidebarMenuItem>
    </SidebarMenu>
  );
}
