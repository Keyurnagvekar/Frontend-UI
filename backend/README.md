# Backend integration placeholder

Backend intentionally not implemented in this frontend handoff. Implement FastAPI and MCP SDK integration here or in the backend team's preferred repository.

See `../docs/API_CONTRACT.md` for proposed endpoint contracts. Recommended first modules:
- `app/main.py`
- `app/api/servers.py`
- `app/api/tools.py`
- `app/api/prompts.py`
- `app/api/integrations.py`
- `app/api/services.py`
- `app/api/logs.py`
- `app/services/mcp_service.py`
- `app/services/server_registry.py`
- `app/services/execution_service.py`

Backend responsibilities include approved MCP configuration, process lifecycle, MCP initialization, tool discovery, schema validation, tool invocation, logging, persistence, auth, and safe secret handling.
