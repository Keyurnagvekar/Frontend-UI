# XPath locator inventory

All locators below depend on `data-testid` values implemented in React. Keep these identifiers stable when styling changes.

## Shared layout
- App shell: `//*[@data-testid='app-shell']`
- Sidebar: `//*[@data-testid='sidebar']`
- Navigation: `//*[@data-testid='main-navigation']`
- Global search: `//input[@data-testid='global-search']`
- Notifications: `//button[@data-testid='notifications-button']`
- Server status: `//*[@data-testid='server-status-panel']`

## Overview
- Page: `//*[@data-testid='overview-page']`
- Server panel: `//*[@data-testid='overview-servers-panel']`
- Execution activity: `//*[@data-testid='execution-activity-panel']`
- Recent executions: `//*[@data-testid='recent-executions-panel']`
- Quick tool test: `//*[@data-testid='quick-tool-test']`
- Tool selector: `//select[@data-testid='quick-tool-select']`
- Run tool: `//button[@data-testid='run-quick-tool']`
- Result: `//*[@data-testid='quick-tool-result']`

## MCP Servers
- Page: `//*[@data-testid='servers-page']`
- Add server: `//button[@data-testid='add-server-btn']`
- Server search: `//input[@data-testid='server-search']`
- Server row by ID: `//*[@data-testid='server-row' and @data-server-id='repository-tools']`
- Server name: `//input[@data-testid='server-name-input']`
- Transport: `//select[@data-testid='server-transport-select']`
- stdio command: `//input[@data-testid='server-command-input']`
- HTTP endpoint: `//input[@data-testid='server-endpoint-input']`
- Connect action: `//button[@data-testid='connect-server-btn']`
- Save server: `//button[@data-testid='save-server-btn']`

## Tools
- Page: `//*[@data-testid='tools-page']`
- Search: `//input[@data-testid='tool-search']`
- Category filter: `//select[@data-testid='tool-category-filter']`
- Tool list: `//*[@data-testid='tool-list']`
- Tool by name: `//*[@data-testid='tool-row' and @data-tool-name='analyze_repository']`
- Add tool: `//button[@data-testid='add-tool-btn']`
- Name field: `//input[@data-testid='tool-name-input']`
- Description field: `//input[@data-testid='tool-description-input']`
- Save tool: `//button[@data-testid='save-tool-btn']`
- Run selected tool: `//button[@data-testid='run-tool-btn']`
- Execution result: `//*[@data-testid='tool-execution-result']`

## Prompts
- Page: `//*[@data-testid='prompts-page']`
- Search: `//input[@data-testid='prompt-search']`
- Prompt row by name: `//*[@data-testid='prompt-row' and @data-prompt-name='Code Review']`
- Create prompt: `//button[@data-testid='create-prompt-btn']`
- Name field: `//input[@data-testid='prompt-name-input']`
- Template field: `//textarea[@data-testid='prompt-template-input']`
- Save prompt: `//button[@data-testid='save-prompt-btn']`

## Integrations
- Page: `//*[@data-testid='integrations-page']`
- Integration by ID: `//*[@data-testid='integration-card' and @data-integration-id='github']`
- GitHub toggle: `//input[@data-testid='integration-toggle-github']`

## Service catalog
- Page: `//*[@data-testid='services-page']`
- Search: `//input[@data-testid='service-search']`
- Register service: `//button[@data-testid='add-catalog-service-btn']`
- Service row by ID: `//*[@data-testid='catalog-service-row' and @data-service-id='client-ui']`
- Name field: `//input[@data-testid='catalog-service-name-input']`
- Save service: `//button[@data-testid='save-catalog-service-btn']`

## Logs
- Page: `//*[@data-testid='logs-page']`
- Search: `//input[@data-testid='log-search']`
- Level filter: `//select[@data-testid='log-level-filter']`
- Log row: `//*[@data-testid='log-row']`

## Locator practices
- Prefer stable `data-testid` attributes over class-based XPath.
- Use text-based XPath only when the text is part of the intended behavior.
- Avoid absolute XPath such as `/html/body/div[1]/...`.
- Escape dynamic values safely if building XPath from user-provided names.
