export interface DashboardProject {
  id: number;
  name: string;
  slug: string;
  description?: string;
  category: "EMPRESA" | "ESTUDIO" | "PESSOAL";
}

function getAuthHeaders(): HeadersInit {
  const token = typeof window === "undefined" ? null : localStorage.getItem("authToken");
  return token ? { Authorization: `Bearer ${token}` } : {};
}

export async function fetchProjects(): Promise<DashboardProject[]> {
  if (typeof window === "undefined") return [];

  const response = await fetch("http://localhost:8080/api/v1/projects", {
    headers: getAuthHeaders(),
  });

  if (!response.ok) {
    throw new Error("Não foi possível carregar os projetos.");
  }

  return (await response.json()) as DashboardProject[];
}
