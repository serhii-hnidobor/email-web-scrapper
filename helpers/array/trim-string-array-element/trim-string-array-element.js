export const trimArrayStringElement = (...arrays) => {
  const result = [];
  for (const array of arrays) {
    const trimmedArray = array.map((el) => {
      if (typeof el === "string") {
        return el.trim();
      }
      return el;
    });
    result.push(trimmedArray);
  }
  return result;
};
