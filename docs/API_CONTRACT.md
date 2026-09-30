# Proposed API contract (backend integration handoff)

Base URL: `VITE_API_BASE_URL` (suggested local value `http://localhost:8000`).

The frontend feature services expect these endpoint shapes. The backend owner can adapt either side, but update `src/types/api.ts` and feature service modules together.

## Health
- `GET /api/health`
- Example: `{ "status": "ok", "version": "0.1.0" }`

## MCP servers
- `GET /api/servers` → `Server[]`
- `POST /api/servers` body `{ name, transport, command?, endpoint?, description? }` → `Server`
- `POST /api/servers/{id}/connect` → updated `Server`
- `POST /api/servers/{id}/stop` → updated `Server`
- `POST /api/servers/{id}/restart` → updated `Server`

For `stdio`, backend starts and owns an approved process. For HTTP transports, backend connects to an approved endpoint. Do not expose arbitrary command execution to the browser.

## Tools
- `GET /api/tools` → `Tool[]`
- `GET /api/servers/{serverId}/tools` → `Tool[]`
- `POST /api/tools/{toolName}/execute` body `{ serverId, input }` → `{ executionId, status, durationMs, result?, error? }`
- `POST /api/tools` body `{ name, description, category, serverId, inputSchema? }` → `Tool`

Tools should ideally be discovered from connected MCP servers rather than stored as fabricated records. The create-tool endpoint is for app-owned registry metadata or explicitly supported server-side registration.

## Prompts
- `GET /api/prompts` → `Prompt[]`
- `POST /api/prompts` body `{ name, description, category, template }` → `Prompt`

## Integrations
- `GET /api/integrations` → `Integration[]`
- `PATCH /api/integrations/{id}` body `{ enabled }` → `Integration`

## Service catalog
- `GET /api/services` → `CatalogService[]`
- `POST /api/services` body `{ name, kind, owner, repository, environment, description }` → `CatalogService`

## Logs
- `GET /api/logs?level=&limit=` → `LogEntry[]`

## Suggested response types
See `src/types/api.ts`. Keep secrets server-side. Never send tokens, passwords, or raw environment secrets to the browser.
