import { Link, useRouterState } from "@tanstack/react-router";
import { LayoutDashboard, KanbanSquare, Frame, GalleryVerticalEnd, Palette, LogOut } from "lucide-react";

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

const items = [
  { title: "Dashboard", url: "/dashboard", icon: LayoutDashboard },
  { title: "Kanban & Timeline", url: "/kanban", icon: KanbanSquare },
  { title: "Canvas Infinito", url: "/canvas", icon: Frame },
  { title: "Vitrine & NDA", url: "/showcase", icon: GalleryVerticalEnd },
] as const;

export function AppSidebar() {
  const { state } = useSidebar();
  const collapsed = state === "collapsed";
  const pathname = useRouterState({ select: (r) => r.location.pathname });

  return (
    <Sidebar collapsible="icon" className="border-sidebar-border">
      <SidebarHeader className="px-3 py-4">
        <div className="flex items-center gap-3">
          <div className="gradient-primary flex size-9 shrink-0 items-center justify-center rounded-xl shadow-[var(--shadow-glow)]">
            <Palette className="size-5 text-primary-foreground" />
          </div>
          {!collapsed && (
            <div className="leading-tight">
              <p className="text-sm font-semibold">Ateliê Studio</p>
              <p className="text-xs text-muted-foreground">Gestão de produção</p>
            </div>
          )}
        </div>
      </SidebarHeader>

      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Navegação</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => (
                <SidebarMenuItem key={item.url}>
                  <SidebarMenuButton asChild isActive={pathname === item.url} tooltip={item.title}>
                    <Link to={item.url} className="flex items-center gap-2">
                      <item.icon className="size-4" />
                      <span>{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter className="gap-2 p-3">
        <div className="glass flex items-center gap-3 rounded-xl p-2">
          <Avatar className="size-8">
            <AvatarFallback className="bg-primary/20 text-xs text-foreground">MR</AvatarFallback>
          </Avatar>
          {!collapsed && (
            <div className="min-w-0 flex-1 leading-tight">
              <p className="truncate text-sm font-medium">Marina Rocha</p>
              <p className="truncate text-xs text-muted-foreground">Artista / Freelancer</p>
            </div>
          )}
          {!collapsed && (
            <Link to="/login" aria-label="Sair" className="text-muted-foreground hover:text-foreground">
              <LogOut className="size-4" />
            </Link>
          )}
        </div>
      </SidebarFooter>
    </Sidebar>
  );
}
