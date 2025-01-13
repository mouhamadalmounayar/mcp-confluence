export const getTextContent = (doc: any) => {
  if (doc.type === "text") {
    return doc.text;
  } else if (doc.content) {
    return doc.content.map(getTextContent).join(" ");
  }
  return "";
};
