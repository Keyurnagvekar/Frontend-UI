import { apiClient } from "./client";
import { mockLogs } from "./mockData";
import type { LogEntry } from "../types/api";

export const logService = {
  async list(): Promise<LogEntry[]> {
    if (apiClient.useMocks) return [...mockLogs];
    return apiClient.get<LogEntry[]>("/api/logs?limit=100");
  }
};
