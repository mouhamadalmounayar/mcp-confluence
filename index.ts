import { ConfluenceService } from "./src/services/confluence.service";
const runRequestService = async () => {
  const confluenceService = new ConfluenceService();
  const pageId = 65820;
  const response = await confluenceService.requestPage(pageId);
  console.log(response);
};
runRequestService();
