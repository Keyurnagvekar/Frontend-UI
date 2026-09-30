import { apiClient } from "./client";
import { mockCatalogServices } from "./mockData";
import type { CatalogService } from "../types/api";

let items = [...mockCatalogServices];

export const serviceCatalogService = {
  async list(): Promise<CatalogService[]> {
    if (apiClient.useMocks) return [...items];
    return apiClient.get<CatalogService[]>("/api/services");
  },
  async create(input: Pick<CatalogService, "name" | "kind" | "owner" | "repository" | "environment" | "description">): Promise<CatalogService> {
    if (!input.name.trim()) throw new Error("Service name is required.");
    if (apiClient.useMocks) {
      const item: CatalogService = { ...input, id: `svc-${Date.now()}`, status: "Registered", version: "0.1.0" };
      items = [item, ...items];
      return item;
    }
    return apiClient.post<CatalogService>("/api/services", input);
  }
};
