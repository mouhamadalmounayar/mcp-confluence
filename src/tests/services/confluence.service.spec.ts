import { ConfluenceService } from "../../services/confluence.service";

describe("ConfluenceService", () => {
  let confluenceService: ConfluenceService;
  let fetchMock: jest.Mock;
  beforeEach(() => {
    process.env.DOMAIN_NAME = "example.atlassian.net";
    process.env.API_TOKEN = "mock-api-token";
    process.env.EMAIL = "mock-email@example.com";
    confluenceService = new ConfluenceService();
    fetchMock = jest.fn();
    global.fetch = fetchMock;
  });
  afterEach(() => {
    jest.clearAllMocks();
  });
  it("should make a successful request to fetch a page", async () => {
    fetchMock.mockResolvedValueOnce({
      ok: true,
      json: jest.fn().mockReturnValueOnce({}),
    });
    await confluenceService.requestPage(123);
    expect(fetchMock).toHaveBeenCalledWith(
      "https://example.atlassian.net/wiki/api/v2/pages/123/?body-format=atlas_doc_format",
      {
        method: "GET",
        headers: {
          Authorization: `Basic ${Buffer.from("mock-email@example.com:mock-api-token").toString("base64")}`,
          Accept: "application/json",
        },
      },
    );
  });
  it("should throw an error when the request is not successful", async () => {
    fetchMock.mockResolvedValueOnce({ ok: false, status: 404 });
    await expect(confluenceService.requestPage(123)).rejects.toThrow(
      "Failed http request: 404",
    );
  });
});
