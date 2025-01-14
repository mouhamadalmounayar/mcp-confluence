export interface Argument {
  name: string;
  description: string;
  required: boolean;
}

export interface PromptObject {
  name: string;
  description: string;
  arguments: Argument[];
}

export interface Response {
  description: string;
  messages: {
    role: string;
    content: {
      type: string;
      text: string;
    };
  }[];
}
