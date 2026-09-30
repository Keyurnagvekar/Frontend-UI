# MCP Control Center — Frontend starter

React + TypeScript + Vite frontend for the MCP Control Center. The UI is intentionally separated from backend implementation so a backend developer can integrate FastAPI and the official MCP SDK later.

## Included UI

- Overview dashboard
- MCP Servers
- Tools
- Prompts
- Integrations
- Services (deployable service catalog)
- Logs

Resources, Playground, Settings, and the top-right Admin menu are intentionally omitted.

## Run locally

Requirements: Node.js 20+ and npm.

```bash
npm install
cp .env.example .env
npm run dev
```

On Windows PowerShell, copy the env file with:

```powershell
Copy-Item .env.example .env
npm install
npm run dev
```

Open `http://localhost:5173`.

Build check:

```bash
npm run build
```

## Backend integration seam

All browser-side HTTP access belongs in `src/services/client.ts`. Feature modules (`serverService.ts`, `toolService.ts`, `promptService.ts`, `integrationService.ts`, `serviceCatalogService.ts`, and `logService.ts`) call that client. React pages do not call `fetch` directly.

By default, `VITE_USE_MOCKS=true` uses demo data and simulates actions locally. To integrate the backend:
1. Implement the endpoints documented in `docs/API_CONTRACT.md`.
2. Set `VITE_API_BASE_URL=http://localhost:8000`.
3. Set `VITE_USE_MOCKS=false`.
4. Adjust response types in `src/types/api.ts` if backend contracts differ.

The UI demo actions are not real MCP execution. The backend must implement approved server configuration, MCP connection lifecycle, tool discovery/execution, persistence, and authorization.

## XPath / Selenium

UI controls have stable `data-testid` attributes. See `tests/LOCATOR_INVENTORY.md` and the Selenium smoke test in `tests/`. Locators use XPath against rendered DOM; verify the browser and test environment are running before executing tests.

```bash
python -m pip install -r tests/requirements.txt
python -m pytest tests -v
```

The Selenium test expects Chrome/ChromeDriver compatibility and the frontend to be running at `http://localhost:5173`.

## Deployment structure

`deploy/` contains a placeholder Dockerfile for the frontend and a sample Kubernetes Deployment/Service. Backend and MCP server workloads should be deployed separately. Do not bake credentials into the frontend image.
