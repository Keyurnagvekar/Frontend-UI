export type ServerStatus = "Running" | "Stopped" | "Error" | "Connecting";

export interface Server {
  id: string;
  name: string;
  transport: "stdio" | "http" | "sse";
  description: string;
  status: ServerStatus;
  version: string;
  toolCount: number;
  endpoint?: string;
  command?: string;
}

export interface Tool {
  id: string;
  name: string;
  description: string;
  category: string;
  serverId: string;
  status: "Active" | "Inactive";
  updatedAt: string;
  inputSchema?: Record<string, unknown>;
}

export interface Prompt {
  id: string;
  name: string;
  description: string;
  category: string;
  template: string;
  status: "Active" | "Inactive";
}

export interface Integration {
  id: string;
  name: string;
  description: string;
  kind: string;
  enabled: boolean;
  status: "Connected" | "Disconnected" | "Needs setup";
}

export interface CatalogService {
  id: string;
  name: string;
  kind: "Client" | "API" | "Worker" | "MCP" | "Data";
  owner: string;
  repository: string;
  environment: string;
  status: "Registered" | "Planned";
  description: string;
  version: string;
}

export interface LogEntry {
  id: string;
  time: string;
  level: "INFO" | "WARN" | "ERROR";
  message: string;
  source: string;
}

export interface ExecuteToolRequest {
  serverId: string;
  input: Record<string, unknown>;
}

export interface ExecuteToolResponse {
  executionId: string;
  status: "Success" | "Failed";
  durationMs: number;
  result?: unknown;
  error?: string;
}
