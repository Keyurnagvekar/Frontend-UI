import { apiClient } from "./client";
import { mockServers } from "./mockData";
import type { Server } from "../types/api";

let servers = [...mockServers];

export const serverService = {
  async list(): Promise<Server[]> {
    if (apiClient.useMocks) return [...servers];
    return apiClient.get<Server[]>("/api/servers");
  },
  async create(input: Pick<Server, "name" | "transport" | "description"> & Partial<Pick<Server, "command" | "endpoint">>): Promise<Server> {
    if (!input.name.trim()) throw new Error("Server name is required.");
    if (apiClient.useMocks) {
      const item: Server = { ...input, id: `server-${Date.now()}`, status: "Stopped", version: "local", toolCount: 0 };
      servers = [...servers, item];
      return item;
    }
    return apiClient.post<Server>("/api/servers", input);
  },
  async action(id: string, action: "connect" | "stop" | "restart"): Promise<Server> {
    if (apiClient.useMocks) {
      servers = servers.map(s => s.id === id ? { ...s, status: action === "stop" ? "Stopped" : "Running" } : s);
      return servers.find(s => s.id === id)!;
    }
    return apiClient.post<Server>(`/api/servers/${encodeURIComponent(id)}/${action}`);
  }
};
