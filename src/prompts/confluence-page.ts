import { Argument, PromptObject, Response } from "../models/prompt.model";
import { ConfluenceService } from "../services/confluence.service";
import { getTextContent } from "../utils";

export class ConfluencePagePrompt {
  promptObject: PromptObject = {
    name: "confluence-page",
    description: "Retrieve confluence page content",
    arguments: [
      {
        name: "pageId",
        description: "The id of the page to fetch",
        required: true,
      },
    ],
  };
  _confluenceService: ConfluenceService = new ConfluenceService();
  async handler(pageId: any) {
    const document = await this._confluenceService.requestPage(pageId);
    return {
      description: `Confluence page id ${pageId}`,
      messages: [
        {
          role: "user",
          content: {
            type: "text",
            text: getTextContent(
              JSON.parse(document.body.atlas_doc_format.value),
            ),
          },
        },
      ],
    };
  }
  static get promptObject(): PromptObject {
    return this.promptObject;
  }
}
