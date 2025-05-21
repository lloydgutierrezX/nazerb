export const consoleLog = (
  message,
  type = "content",
  additionalMessage = ""
) => {
  switch (type) {
    case "title":
      return console.log(
        `################# ${message} #################`,
        additionalMessage
      );
    case "content":
      return console.log(message, additionalMessage);
    case "error":
      return console.error(`ERROR: `, message, additionalMessage);
  }
};
