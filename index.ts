import { ConfluenceService } from "./src/services/confluence.service";
import { getTextContent } from "./src/utils";
const runRequestService = async () => {
  const confluenceService = new ConfluenceService();
  const pageId = 65820;
  const response = await confluenceService.requestPage(pageId);
  const doc = JSON.parse(response.body.atlas_doc_format.value);
  const document = getTextContent(doc);
  console.log(document);
};
runRequestService();
