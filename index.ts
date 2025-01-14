import { ConfluenceService } from "./src/services/confluence.service";
import { getTextContent } from "./src/utils";
import {
  GetPromptRequestSchema,
  ListPromptsRequestSchema,
} from "@modelcontextprotocol/sdk/types.js";
import { Server } from "@modelcontextprotocol/sdk/server/index.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { ConfluencePagePrompt } from "./src/prompts/confluence-page";
const server = new Server(
  {
    name: "confluence mcp",
    version: "0.1.0",
  },
  {
    capabilities: {
      resources: {},
      tools: {},
      prompts: {},
    },
  },
);
const _confluencePagePrompt = new ConfluencePagePrompt();
server.setRequestHandler(ListPromptsRequestSchema, () => {
  return {
    prompts: [_confluencePagePrompt.promptObject],
  };
});

server.setRequestHandler(GetPromptRequestSchema, async (request) => {
  if (request.params.name === _confluencePagePrompt.promptObject.name) {
    if (request.params.arguments) {
      const { pageId } = request.params.arguments;
      const response = await _confluencePagePrompt.handler(pageId);
      return response;
    }
  }
  throw new Error("Prompt not found");
});

const run_server = async () => {
  const transport = new StdioServerTransport();
  await server.connect(transport);
};

run_server().catch((error) => {
  console.error(error);
  process.exit(1);
});
