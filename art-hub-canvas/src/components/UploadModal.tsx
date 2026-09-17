import { useEffect, useState } from "react";
import { FileArchive, UploadCloud } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Progress } from "@/components/ui/progress";

const FILES = [
  { name: "cidade_flutuante_v07.psd", size: "2.4 GB" },
  { name: "reliquiario_highpoly.blend", size: "860 MB" },
];

export function UploadModal({
  open,
  onOpenChange,
}: {
  open: boolean;
  onOpenChange: (v: boolean) => void;
}) {
  const [progress, setProgress] = useState(0);
  const [uploading, setUploading] = useState(false);

  useEffect(() => {
    if (!uploading) return;
    const id = setInterval(() => {
      setProgress((p) => {
        if (p >= 100) {
          clearInterval(id);
          setUploading(false);
          return 100;
        }
        return Math.min(100, p + 7);
      });
    }, 220);
    return () => clearInterval(id);
  }, [uploading]);

  useEffect(() => {
    if (!open) {
      setProgress(0);
      setUploading(false);
    }
  }, [open]);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="glass sm:max-w-lg">
        <DialogHeader>
          <DialogTitle>Enviar arquivos pesados</DialogTitle>
          <DialogDescription>
            Suporte a .psd, .blend, .ai e .exr com até 5 GB por arquivo.
          </DialogDescription>
        </DialogHeader>

        <div className="dot-grid rounded-xl border border-dashed border-border p-8 text-center">
          <UploadCloud className="mx-auto size-8 text-primary" />
          <p className="mt-3 text-sm font-medium">Arraste os arquivos aqui</p>
          <p className="text-xs text-muted-foreground">ou clique para selecionar do seu computador</p>
        </div>

        <div className="space-y-3">
          {FILES.map((f) => (
            <div key={f.name} className="glass rounded-xl p-3">
              <div className="flex items-center gap-3">
                <FileArchive className="size-4 text-primary" />
                <span className="min-w-0 flex-1 truncate text-sm">{f.name}</span>
                <span className="text-xs text-muted-foreground">{f.size}</span>
              </div>
              <Progress value={progress} className="mt-3 h-2" />
              <p className="mt-1 text-right text-xs text-muted-foreground">
                {progress === 100 ? "Enviado" : `${progress}%`}
              </p>
            </div>
          ))}
        </div>

        <DialogFooter>
          <Button variant="ghost" onClick={() => onOpenChange(false)}>
            Cancelar
          </Button>
          <Button
            className="gradient-primary text-primary-foreground"
            disabled={uploading}
            onClick={() => {
              setProgress(0);
              setUploading(true);
            }}
          >
            {uploading ? "Enviando..." : "Iniciar envio"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
