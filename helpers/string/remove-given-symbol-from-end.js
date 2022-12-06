export const removeGivenSymbolFromEnd = (string, symbol) => {
  if (!string) {
    return string;
  }
  const array = string.split("");
  if (array[array.length - 1] === symbol) {
    array.pop();
  }
  return array.join("");
};
