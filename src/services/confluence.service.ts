import * as dotenv from "dotenv";
import { Config } from "../models/ config.model";
dotenv.config();

export class ConfluenceService {
  config?: Config;
  constructor() {
    this.config = {
      "domain-name": process.env.DOMAIN_NAME,
      "api-token": process.env.API_TOKEN,
      email: process.env.EMAIL,
    };
  }

  pageIdUrl(id: number): string {
    return `https://${this.config?.["domain-name"]}/wiki/api/v2/pages/${id}/?body-format=atlas_doc_format`;
  }

  requestPage = async (pageId: number) => {
    const response = await fetch(this.pageIdUrl(pageId), {
      method: "GET",
      headers: {
        Authorization: `Basic ${Buffer.from(
          `${this.config?.email}:${this.config?.["api-token"]}`,
        ).toString("base64")}`,
        Accept: "application/json",
      },
    });
    if (!response.ok) {
      throw new Error(`Failed http request: ${response.status}`);
    }
    const jsonDocument = await response.json();
    return jsonDocument;
  };
}
