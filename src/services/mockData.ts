import type { CatalogService, Integration, LogEntry, Prompt, Server, Tool } from "../types/api";

export const mockServers: Server[] = [
  { id: "local-mcp", name: "Local MCP Server", transport: "stdio", description: "Main server with stdio transport", status: "Running", version: "0.1.0", toolCount: 4, command: "python server.py" },
  { id: "repository-tools", name: "Repository Tools", transport: "http", description: "Git integration and code analysis", status: "Running", version: "1.2.0", toolCount: 5, endpoint: "http://localhost:8100/mcp" },
  { id: "qa-automation", name: "QA Automation", transport: "stdio", description: "Test automation tools and utilities", status: "Stopped", version: "0.4.0", toolCount: 3, command: "python qa_server.py" }
];

export const mockTools: Tool[] = [
  { id: "t1", name: "analyze_repository", description: "Analyze code repositories and identify potential issues.", category: "GitHub", serverId: "repository-tools", status: "Active", updatedAt: "Oct 10, 2026", inputSchema: { type: "object", properties: { repo_path: { type: "string" }, analysis_type: { type: "string" }, include_tests: { type: "boolean" } } } },
  { id: "t2", name: "run_tests", description: "Run automation tests and return test results.", category: "QA/Testing", serverId: "qa-automation", status: "Active", updatedAt: "Oct 9, 2026", inputSchema: { type: "object", properties: { test_path: { type: "string" } } } },
  { id: "t3", name: "search_code", description: "Search for code, functions, and keywords.", category: "Repository", serverId: "local-mcp", status: "Active", updatedAt: "Oct 8, 2026", inputSchema: { type: "object", properties: { query: { type: "string" } } } },
  { id: "t4", name: "get_file_content", description: "Read file content from a repository.", category: "File System", serverId: "local-mcp", status: "Active", updatedAt: "Oct 8, 2026", inputSchema: { type: "object", properties: { path: { type: "string" } } } }
];

export const mockPrompts: Prompt[] = [
  { id: "p1", name: "Code Review", description: "Review code and suggest improvements.", category: "Code Review", template: "Review the following code for correctness, security, and maintainability:\\n{{code}}", status: "Active" },
  { id: "p2", name: "Test Case Generation", description: "Generate test cases from requirements.", category: "QA", template: "Generate positive, negative, and boundary test cases for:\\n{{requirements}}", status: "Active" },
  { id: "p3", name: "Bug Analysis", description: "Analyze and summarize bug reports.", category: "QA", template: "Analyze this bug report. Identify reproduction steps, expected behavior, actual behavior, and likely areas to investigate:\\n{{bug_report}}", status: "Active" },
  { id: "p4", name: "Documentation", description: "Generate technical documentation.", category: "General", template: "Create concise technical documentation for:\\n{{content}}", status: "Active" }
];

export const mockIntegrations: Integration[] = [
  { id: "github", name: "GitHub", description: "Repository access and issue management", kind: "Source control", enabled: true, status: "Connected" },
  { id: "local-repo", name: "Local Repository", description: "Analyze local codebases", kind: "Filesystem", enabled: true, status: "Connected" },
  { id: "database", name: "Database", description: "Query and analyze data", kind: "Data", enabled: true, status: "Connected" },
  { id: "qa-automation", name: "QA Automation", description: "Run tests and analyze results", kind: "Testing", enabled: false, status: "Needs setup" }
];

export const mockCatalogServices: CatalogService[] = [
  { id: "client-ui", name: "Control Center UI", kind: "Client", owner: "Platform", repository: "mcp-control-center", environment: "local", status: "Registered", description: "React administration UI", version: "0.1.0" },
  { id: "api-service", name: "Control Center API", kind: "API", owner: "Platform", repository: "mcp-control-center", environment: "local", status: "Registered", description: "FastAPI integration boundary", version: "0.1.0" },
  { id: "mcp-runtime", name: "MCP Runtime", kind: "MCP", owner: "Developer Tools", repository: "repository-tools", environment: "local", status: "Planned", description: "Connects to approved MCP servers", version: "planned" },
  { id: "data-store", name: "Metadata Store", kind: "Data", owner: "Platform", repository: "mcp-control-center", environment: "local", status: "Planned", description: "Persistent catalog and execution history", version: "planned" }
];

export const mockLogs: LogEntry[] = [
  { id: "l1", time: "10:23:15", level: "INFO", message: "Tool analyze_repository executed in 2.4s", source: "execution-service" },
  { id: "l2", time: "10:18:02", level: "INFO", message: "Starting QA test execution", source: "qa-automation" },
  { id: "l3", time: "10:15:41", level: "ERROR", message: "Repository fetch failed: permission denied", source: "repository-tools" },
  { id: "l4", time: "10:12:33", level: "INFO", message: "File content retrieved successfully", source: "local-mcp" },
  { id: "l5", time: "10:08:17", level: "WARN", message: "Rate limit approaching (80%)", source: "github" },
  { id: "l6", time: "10:01:56", level: "INFO", message: "Server health check completed", source: "server-registry" }
];
