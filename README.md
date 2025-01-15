# Mcp-Confluence
> [!Important]
> This repository is still in early development stages, more prompts, resources and tools will be added in the future.

This repository contains the source code for a confluence context server.
For now, the server only contains prompts aimed to be used as slash commands by Zed.

# Installation
```bash
npm install mcp-confluence
```
# Usage
## Zed

### Configuration:
The following environment variables must be set:
  - `API_KEY`: The API key to authenticate your confluence account.
  - `DOMAIN_NAME`: The domain name of your confluence account. `example.atlassian.net`
  - `EMAIL`: The email of your confluence account.

```json

"context_servers": {
    "confluence-context-server": {
      "settings": {
        "api_token": ,
        "domain_name": ,
        "email":
      }
    }
  }
```
## MCP Inspector
You can also use the MCP Inspector to interact with the server.
```bash
npm install @modelcontextprotocol/sdk

npx -y @modelcontextprotocol/inspector npx mcp-confluence
```

# Prompts
## Confluence Page
- name: `confluence-page`
- description: Get a confluence page by its id
- arguments:
  - `pageId`: The id of the confluence page
