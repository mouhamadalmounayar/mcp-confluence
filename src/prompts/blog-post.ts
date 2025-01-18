import { PromptObject } from "../models/prompt.model";
import { ConfluenceService } from "../services/confluence.service";
import { getTextContent } from "../utils";

export class BlogPostPrompt {
  promptObject: PromptObject = {
    name: "blog-post",
    description: "Retrieve blog post content",
    arguments: [
      {
        name: "blogId",
        description: "The id of the blog post to fetch",
        required: true,
      },
    ],
  };
  _confluenceService: ConfluenceService = new ConfluenceService();
  async handler(blogId: any) {
    const document = await this._confluenceService.requestBlogPost(blogId);
    return {
      description: `Blog post id ${blogId}`,
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
}
