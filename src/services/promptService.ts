import { apiClient } from "./client";
import { mockPrompts } from "./mockData";
import type { Prompt } from "../types/api";

let prompts = [...mockPrompts];

export const promptService = {
  async list(): Promise<Prompt[]> {
    if (apiClient.useMocks) return [...prompts];
    return apiClient.get<Prompt[]>("/api/prompts");
  },
  async create(input: Pick<Prompt, "name" | "description" | "category" | "template">): Promise<Prompt> {
    if (!input.name.trim()) throw new Error("Prompt name is required.");
    if (apiClient.useMocks) {
      const item: Prompt = { ...input, id: `prompt-${Date.now()}`, status: "Active" };
      prompts = [item, ...prompts];
      return item;
    }
    return apiClient.post<Prompt>("/api/prompts", input);
  }
};
