export type ActivityEventType =
  | "TASK_COMPLETED"
  | "TASK_REVIEWED"
  | "CANVAS_EDIT"
  | "FILE_UPLOAD";

const API_URL = "http://localhost:8080/api/v1/activity";

function getAuthHeaders(): HeadersInit {
  const token = typeof window === "undefined" ? null : localStorage.getItem("authToken");
  return token ? { Authorization: `Bearer ${token}` } : {};
}

export async function fetchActivityHeatmap(): Promise<Array<{ date: string; count: number }>> {
  if (typeof window === "undefined") return [];

  const response = await fetch(`${API_URL}/heatmap`, {
    headers: getAuthHeaders(),
  });

  if (!response.ok) {
    throw new Error("Não foi possível carregar o mapa de atividade.");
  }

  return (await response.json()) as Array<{ date: string; count: number }>;
}

export function logActivity(type: ActivityEventType): void {
  if (typeof window === "undefined") return;

  void fetch(API_URL, {
    method: "POST",
    headers: {
      ...getAuthHeaders(),
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ type }),
  }).catch((error) => {
    console.warn("Não foi possível registrar a atividade.", error);
  });
}
