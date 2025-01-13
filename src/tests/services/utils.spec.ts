import { getTextContent } from "../../utils";
describe("getTextContent", () => {
  it("should return the inline text of a document", () => {
    const doc = {
      type: "mock_type",
      content: [
        {
          type: "text",
          text: "Hello",
        },
        {
          type: "mock_type",
          content: [
            {
              type: "text",
              text: "World",
            },
          ],
        },
      ],
    };
    const result = getTextContent(doc);
    expect(result).toEqual("Hello World");
  });
});
