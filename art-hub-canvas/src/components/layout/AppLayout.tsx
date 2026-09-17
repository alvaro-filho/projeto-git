import { useState, type ReactNode } from "react";
import { Bell, Search, UploadCloud } from "lucide-react";

import { AppSidebar } from "@/components/layout/AppSidebar";
import { UploadModal } from "@/components/UploadModal";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";

export function AppLayout({
  title,
  subtitle,
  children,
}: {
  title: string;
  subtitle?: string;
  children: ReactNode;
}) {
  const [uploadOpen, setUploadOpen] = useState(false);

  return (
    <SidebarProvider>
      <div className="flex min-h-screen w-full bg-background">
        <AppSidebar />
        <div className="flex min-w-0 flex-1 flex-col">
          <header className="glass sticky top-0 z-20 flex flex-wrap items-center gap-3 rounded-none border-x-0 border-t-0 px-4 py-3">
            <SidebarTrigger />
            <div className="mr-auto min-w-0">
              <h1 className="truncate text-base font-semibold">{title}</h1>
              {subtitle && <p className="truncate text-xs text-muted-foreground">{subtitle}</p>}
            </div>
            <div className="relative w-full max-w-xs">
              <Search className="pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                placeholder="Buscar projetos, artes, contratantes..."
                className="border-border/60 bg-white/5 pl-9"
              />
            </div>
            <Button variant="ghost" size="icon" aria-label="Notificações">
              <Bell className="size-4" />
            </Button>
            <Button onClick={() => setUploadOpen(true)} className="gradient-primary text-primary-foreground">
              <UploadCloud className="size-4" />
              Enviar Arquivo
            </Button>
          </header>
          <main className="fade-up flex-1 p-4 md:p-6">{children}</main>
        </div>
      </div>
      <UploadModal open={uploadOpen} onOpenChange={setUploadOpen} />
    </SidebarProvider>
  );
}
