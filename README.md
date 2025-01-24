# Mcp-Confluence
> [!Important]
> This repository is still in early development stages, more prompts, resources and tools will be added in the future.

This repository contains the source code for a confluence context server.
For now, the server only contains prompts aimed to be used as slash commands by Zed.

<a href="https://glama.ai/mcp/servers/qkapsouyfx"><img width="380" height="200" src="https://glama.ai/mcp/servers/qkapsouyfx/badge" alt="mcp-confluence MCP server" /></a>

# Installation
```bash
npm install -g mcp-confluence
```
# Usage
The following environment variables must be set:
  - `API_KEY`: The API key to authenticate your confluence account.
  - `DOMAIN_NAME`: The domain name of your confluence account. `example.atlassian.net`
  - `EMAIL`: The email of your confluence account.

```json
"confluence-context-server": {
  "command": "node",
  "args": [
    "node_modules/mcp-confluence/dist/index.js"
  ],
  "env": {
    "API_TOKEN": "",
    "DOMAIN_NAME": "",
    "EMAIL": ""
  }
}
```
## Zed

Install the [confluence-context-server extension](https://github.com/mouhamadalmounayar/confluence-context-server).
Then, add these settings to your zed settings.
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
![2025-01-18 19-04-24](https://github.com/user-attachments/assets/4a3e6481-3190-45e2-af51-fbee0cf946e9)

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

## Blog Post
- name: `blog-post`
- description: Get a blog post by its id
- arguments:
  - `blogId`: The id of the blog post
