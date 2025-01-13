export interface Argument {
  name: string;
  description: string;
  required: boolean;
}

export interface Prompt {
  name: string;
  description: string;
  arguments: Argument[];
  handler: () => Promise<Response>;
}

export interface Response {
  description: string;
  message: {
    role: string;
    content: {
      type: string;
      text: string;
    };
  };
}
