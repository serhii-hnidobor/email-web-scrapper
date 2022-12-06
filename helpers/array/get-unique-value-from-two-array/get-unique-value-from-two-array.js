import { trimArrayStringElement } from "../array.js";

export const getUniqueValueFromTwoArray = (firstArray, secondArray) => {
  const [firstInputArray, secondInputArray] = trimArrayStringElement(
    firstArray,
    secondArray
  );
  const result = [];
  for (const secondArrayElement of secondInputArray) {
    if (firstInputArray.includes(secondArrayElement)) {
      continue;
    }
    result.push(secondArrayElement);
  }
  return result;
};
