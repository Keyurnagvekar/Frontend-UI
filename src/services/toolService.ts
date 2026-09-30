import { apiClient } from "./client";
import { mockTools } from "./mockData";
import type { ExecuteToolResponse, Tool } from "../types/api";

let tools = [...mockTools];

export const toolService = {
  async list(): Promise<Tool[]> {
    if (apiClient.useMocks) return [...tools];
    return apiClient.get<Tool[]>("/api/tools");
  },
  async create(input: Pick<Tool, "name" | "description" | "category" | "serverId">): Promise<Tool> {
    if (!input.name.trim()) throw new Error("Tool name is required.");
    if (apiClient.useMocks) {
      const item: Tool = { ...input, id: `tool-${Date.now()}`, status: "Active", updatedAt: new Date().toLocaleDateString() };
      tools = [item, ...tools];
      return item;
    }
    return apiClient.post<Tool>("/api/tools", input);
  },
  async execute(name: string, serverId: string, input: Record<string, unknown>): Promise<ExecuteToolResponse> {
    if (apiClient.useMocks) {
      return { executionId: `demo-${Date.now()}`, status: "Success", durationMs: 240, result: { demo: true, tool: name, input, message: "Demo response only — connect the backend for real MCP execution." } };
    }
    return apiClient.post<ExecuteToolResponse>(`/api/tools/${encodeURIComponent(name)}/execute`, { serverId, input });
  }
};
