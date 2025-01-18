import { getTextContent } from "./src/utils";
import {
  GetPromptRequestSchema,
  ListPromptsRequestSchema,
} from "@modelcontextprotocol/sdk/types.js";
import { Server } from "@modelcontextprotocol/sdk/server/index.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { ConfluencePagePrompt } from "./src/prompts/confluence-page";
import { BlogPostPrompt } from "./src/prompts/blog-post";
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
const _blogPostPrompt = new BlogPostPrompt();
server.setRequestHandler(ListPromptsRequestSchema, () => {
  return {
    prompts: [_confluencePagePrompt.promptObject, _blogPostPrompt.promptObject],
  };
});

server.setRequestHandler(GetPromptRequestSchema, async (request) => {
  switch (request.params.name) {
    case _confluencePagePrompt.promptObject.name:
      if (request.params.arguments) {
        const { pageId } = request.params.arguments;
        const response = await _confluencePagePrompt.handler(pageId);
        return response;
      }
    case _blogPostPrompt.promptObject.name:
      if (request.params.arguments) {
        const { blogId } = request.params.arguments;
        const response = await _blogPostPrompt.handler(blogId);
        return response;
      }
    default:
      throw new Error(`Unknown prompt name: ${request.params.name}`);
  }
});

const run_server = async () => {
  const transport = new StdioServerTransport();
  await server.connect(transport);
};

run_server().catch((error) => {
  console.error(error);
  process.exit(1);
});
