import { useCallback, useRef, useState } from "react";
import { Hand, Image as ImageIcon, Minus, Plus, PenTool, StickyNote } from "lucide-react";

import { Button } from "@/components/ui/button";

type Item = {
  id: string;
  type: "note" | "image" | "vector";
  x: number;
  y: number;
  text: string;
  cover?: string;
};

const INITIAL: Item[] = [
  { id: "n1", type: "note", x: 60, y: 70, text: "Paleta fria + acentos âmbar" },
  { id: "n2", type: "note", x: 330, y: 200, text: "Silhueta precisa ler a 10% de zoom" },
  { id: "i1", type: "image", x: 620, y: 90, text: "Ref. arquitetura", cover: "linear-gradient(135deg,#6366f1,#22d3ee)" },
  { id: "i2", type: "image", x: 420, y: 380, text: "Estudo de luz", cover: "linear-gradient(135deg,#f472b6,#a855f7)" },
  { id: "v1", type: "vector", x: 120, y: 330, text: "Grid de composição" },
];

const TOOLS = [
  { id: "pan", label: "Mover", icon: Hand },
  { id: "image", label: "Adicionar imagem", icon: ImageIcon },
  { id: "note", label: "Nota adesiva", icon: StickyNote },
  { id: "vector", label: "Vetor", icon: PenTool },
] as const;

export function InfiniteCanvas({ contextLabel }: { contextLabel: string }) {
  const [items, setItems] = useState<Item[]>(INITIAL);
  const [tool, setTool] = useState<string>("pan");
  const [zoom, setZoom] = useState(100);
  const dragRef = useRef<{ id: string; dx: number; dy: number } | null>(null);
  const areaRef = useRef<HTMLDivElement>(null);

  const onPointerDown = (e: React.PointerEvent, item: Item) => {
    const rect = areaRef.current?.getBoundingClientRect();
    if (!rect) return;
    dragRef.current = { id: item.id, dx: e.clientX - rect.left - item.x, dy: e.clientY - rect.top - item.y };
    (e.target as HTMLElement).setPointerCapture(e.pointerId);
  };

  const onPointerMove = useCallback((e: React.PointerEvent) => {
    const drag = dragRef.current;
    const rect = areaRef.current?.getBoundingClientRect();
    if (!drag || !rect) return;
    const x = Math.max(0, e.clientX - rect.left - drag.dx);
    const y = Math.max(0, e.clientY - rect.top - drag.dy);
    setItems((prev) => prev.map((it) => (it.id === drag.id ? { ...it, x, y } : it)));
  }, []);

  const addItem = (type: Item["type"]) => {
    setTool(type);
    setItems((prev) => [
      ...prev,
      {
        id: `${type}-${Date.now()}`,
        type,
        x: 200 + prev.length * 18,
        y: 150 + prev.length * 14,
        text: type === "note" ? "Nova nota" : type === "image" ? "Nova referência" : "Novo vetor",
        cover: "linear-gradient(135deg,#34d399,#6366f1)",
      },
    ]);
  };

  return (
    <div className="relative h-[calc(100vh-11rem)] overflow-hidden rounded-2xl border border-border bg-[oklch(0.17_0.02_265)]">
      <div
        ref={areaRef}
        onPointerMove={onPointerMove}
        onPointerUp={() => (dragRef.current = null)}
        className="dot-grid absolute inset-0"
        style={{ backgroundSize: `${24 * (zoom / 100)}px ${24 * (zoom / 100)}px` }}
      >
        <div className="absolute inset-0 origin-top-left" style={{ transform: `scale(${zoom / 100})` }}>
          {items.map((item) => (
            <div
              key={item.id}
              onPointerDown={(e) => onPointerDown(e, item)}
              className="absolute cursor-grab touch-none select-none active:cursor-grabbing"
              style={{ left: item.x, top: item.y }}
            >
              {item.type === "note" && (
                <div className="w-44 rounded-lg bg-[oklch(0.86_0.15_95)] p-3 text-sm text-[oklch(0.25_0.05_95)] shadow-lg">
                  {item.text}
                </div>
              )}
              {item.type === "image" && (
                <div className="glass w-52 rounded-xl p-2">
                  <div className="h-28 rounded-lg" style={{ backgroundImage: item.cover }} />
                  <p className="mt-2 text-xs text-muted-foreground">{item.text}</p>
                </div>
              )}
              {item.type === "vector" && (
                <div className="flex size-32 items-center justify-center rounded-xl border-2 border-dashed border-primary/70 text-xs text-primary">
                  {item.text}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      <div className="glass pointer-events-none absolute top-4 left-4 rounded-xl px-3 py-2 text-xs text-muted-foreground">
        {contextLabel}
      </div>

      <div className="glass absolute right-4 bottom-4 h-28 w-40 overflow-hidden rounded-xl">
        <p className="border-b border-border px-2 py-1 text-[10px] text-muted-foreground">Minimapa</p>
        <div className="relative h-full">
          {items.map((it) => (
            <span
              key={it.id}
              className="absolute size-1.5 rounded-full bg-primary"
              style={{ left: `${(it.x / 900) * 100}%`, top: `${(it.y / 600) * 70}%` }}
            />
          ))}
          <span className="absolute inset-2 rounded border border-primary/50" />
        </div>
      </div>

      <div className="glass absolute bottom-4 left-1/2 flex -translate-x-1/2 items-center gap-1 rounded-2xl p-1.5">
        {TOOLS.map((t) => (
          <Button
            key={t.id}
            size="icon"
            variant={tool === t.id ? "default" : "ghost"}
            aria-label={t.label}
            title={t.label}
            className={tool === t.id ? "gradient-primary text-primary-foreground" : ""}
            onClick={() => (t.id === "pan" ? setTool("pan") : addItem(t.id as Item["type"]))}
          >
            <t.icon className="size-4" />
          </Button>
        ))}
        <span className="mx-1 h-6 w-px bg-border" />
        <Button size="icon" variant="ghost" aria-label="Zoom out" onClick={() => setZoom((z) => Math.max(40, z - 10))}>
          <Minus className="size-4" />
        </Button>
        <span className="w-12 text-center text-xs text-muted-foreground">{zoom}%</span>
        <Button size="icon" variant="ghost" aria-label="Zoom in" onClick={() => setZoom((z) => Math.min(180, z + 10))}>
          <Plus className="size-4" />
        </Button>
      </div>
    </div>
  );
}
