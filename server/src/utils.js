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

export const isExist = (arr, toFind) => {
  if (!Array.isArray(arr)) {
    consoleLog("Provided argument is not an array", "error");
    return false;
  }

  return arr.find((item) => {
    if (typeof item === "object") {
      return Object.values(item).includes(toFind);
    }
    return item === toFind;
  });
};
