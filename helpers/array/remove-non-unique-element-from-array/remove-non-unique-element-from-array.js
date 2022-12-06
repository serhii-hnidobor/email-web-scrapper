import { trimArrayStringElement } from "../trim-string-array-element/trim-string-array-element.js";

const removeNonUniqueElementFromArray = (array) => {
  if (array) {
    const [trimmedArray] = trimArrayStringElement(array);
    return trimmedArray.filter(
      (item, pos) => trimmedArray.indexOf(item) === pos
    );
  }
};

export { removeNonUniqueElementFromArray };
