import { apiClient } from "./client";
import { mockIntegrations } from "./mockData";
import type { Integration } from "../types/api";

let integrations = [...mockIntegrations];

export const integrationService = {
  async list(): Promise<Integration[]> {
    if (apiClient.useMocks) return [...integrations];
    return apiClient.get<Integration[]>("/api/integrations");
  },
  async setEnabled(id: string, enabled: boolean): Promise<Integration> {
    if (apiClient.useMocks) {
      integrations = integrations.map(item => item.id === id ? { ...item, enabled, status: enabled ? "Connected" : "Disconnected" } : item);
      return integrations.find(item => item.id === id)!;
    }
    return apiClient.patch<Integration>(`/api/integrations/${encodeURIComponent(id)}`, { enabled });
  }
};
