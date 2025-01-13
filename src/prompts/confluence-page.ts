import { Argument, Prompt, Response } from "../models/prompt.model";
import { ConfluenceService } from "../services/confluence.service";
import { getTextContent } from "../utils";

export class ConfluencePagePrompt implements Prompt {
  name: string;
  description: string;
  arguments: Argument[];
  _confluenceService: ConfluenceService = new ConfluenceService();
  constructor(private pageId: number) {
    this.name = "confluence-page";
    this.description = `Confluence page with id ${pageId}`;
    this.arguments = [
      {
        name: "pageId",
        description: "The id of the page to fetch",
        required: true,
      },
    ];
  }
  async handler(): Promise<Response> {
    const document = await this._confluenceService.requestPage(this.pageId);
    return {
      description: this.description,
      message: {
        role: "user",
        content: {
          type: "text",
          text: getTextContent(document),
        },
      },
    };
  }
}
