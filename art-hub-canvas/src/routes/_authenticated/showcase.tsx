import { useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { BookOpen, CheckCircle2, Lock } from "lucide-react";

import { AppLayout } from "@/components/layout/AppLayout";
import { ArtbookModal } from "@/components/showcase/ArtbookModal";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ARTWORKS, type Artwork } from "@/lib/atelie-data";

export const Route = createFileRoute("/_authenticated/showcase")({
  head: () => ({
    meta: [
      { title: "Vitrine & NDA — Ateliê Studio" },
      {
        name: "description",
        content:
          "Galeria de artes com controle de NDA: aprove a liberação e publique no portfólio em um clique.",
      },
      { property: "og:title", content: "Vitrine & NDA — Ateliê Studio" },
      {
        property: "og:description",
        content: "Controle o que está travado por NDA e o que já está liberado para o portfólio.",
      },
    ],
  }),
  component: ShowcasePage,
});

function ShowcasePage() {
  const [artworks, setArtworks] = useState<Artwork[]>(ARTWORKS);
  const [filter, setFilter] = useState("todas");
  const [artbookOpen, setArtbookOpen] = useState(false);

  const visible = artworks.filter((a) =>
    filter === "travadas" ? a.locked : filter === "liberadas" ? !a.locked : true,
  );

  const release = (id: string) =>
    setArtworks((prev) => prev.map((a) => (a.id === id ? { ...a, locked: false } : a)));

  return (
    <AppLayout title="Vitrine & NDA" subtitle="Controle de publicação das artes entregues">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <Tabs value={filter} onValueChange={setFilter}>
          <TabsList className="bg-white/5">
            <TabsTrigger value="todas">Todas</TabsTrigger>
            <TabsTrigger value="travadas">Travadas por NDA</TabsTrigger>
            <TabsTrigger value="liberadas">Liberadas</TabsTrigger>
          </TabsList>
        </Tabs>
        <Button
          className="gradient-primary text-primary-foreground"
          onClick={() => setArtbookOpen(true)}
        >
          <BookOpen className="size-4" />
          Artbook Digital Exclusivo
        </Button>
      </div>

      <div className="fade-up mt-4 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {visible.map((art) => (
          <article key={art.id} className="glass glass-hover overflow-hidden rounded-2xl">
            <div className="relative h-44" style={{ backgroundImage: art.cover }}>
              {art.locked && (
                <div className="absolute inset-0 backdrop-blur-[6px]">
                  <div className="absolute inset-0 bg-background/40" />
                </div>
              )}
              <div className="absolute top-3 left-3">
                {art.locked ? (
                  <Badge className="bg-destructive text-destructive-foreground">
                    <Lock className="size-3" />
                    Travado por NDA
                  </Badge>
                ) : (
                  <Badge className="bg-neon text-neon-foreground">
                    <CheckCircle2 className="size-3" />
                    Liberado / Publicado
                  </Badge>
                )}
              </div>
            </div>
            <div className="p-4">
              <p className="truncate text-sm font-medium">{art.title}</p>
              <p className="text-xs text-muted-foreground">{art.client}</p>
              {art.locked ? (
                <Button
                  className="gradient-primary mt-3 w-full text-primary-foreground"
                  onClick={() => release(art.id)}
                >
                  Aprovar Liberação
                </Button>
              ) : (
                <Button variant="outline" className="mt-3 w-full bg-white/5" disabled>
                  No portfólio
                </Button>
              )}
            </div>
          </article>
        ))}
      </div>

      <ArtbookModal open={artbookOpen} onOpenChange={setArtbookOpen} />
    </AppLayout>
  );
}
