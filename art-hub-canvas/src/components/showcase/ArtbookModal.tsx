import { BookOpen } from "lucide-react";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { ARTWORKS } from "@/lib/atelie-data";

export function ArtbookModal({
  open,
  onOpenChange,
}: {
  open: boolean;
  onOpenChange: (v: boolean) => void;
}) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="glass sm:max-w-3xl">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <BookOpen className="size-5 text-primary" />
            Artbook Digital Exclusivo
          </DialogTitle>
          <DialogDescription>
            Bastidores do processo: esboços, camadas descartadas e comentários da direção de arte.
          </DialogDescription>
        </DialogHeader>

        <div className="grid max-h-[60vh] gap-4 overflow-y-auto sm:grid-cols-2">
          {ARTWORKS.slice(0, 6).map((art, i) => (
            <figure key={art.id} className="glass rounded-xl p-3">
              <div className="h-36 rounded-lg" style={{ backgroundImage: art.cover }} />
              <figcaption className="mt-2 text-sm font-medium">{art.title}</figcaption>
              <p className="text-xs text-muted-foreground">
                Etapa {i + 1} — {i % 2 === 0 ? "esboço e bloqueio de valores" : "pintura final e ajustes de cor"}
              </p>
            </figure>
          ))}
        </div>
      </DialogContent>
    </Dialog>
  );
}
