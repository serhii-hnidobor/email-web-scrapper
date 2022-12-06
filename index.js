import { htmlParser, http } from "./services/services.js";
import {
  printEmail,
  getUniqueValueFromTwoArray,
  removeNonUniqueElementFromArray,
} from "./helpers/helpers.js";

const initialUrl = process.argv[2];

async function main(allLinksArray = [], linksArray = [], step = 1) {
  if (!allLinksArray || step > 3) {
    return;
  }

  let linkToNextStep = [];

  for (const inputLink of linksArray) {
    let html, externalLink, emailFromLink;
    try {
      html = await http.load(inputLink);
      htmlParser.setHtml(html, inputLink);
      externalLink = htmlParser.getALlLink();
      emailFromLink = htmlParser.getAllEmail();
    } catch (e) {
      continue;
    }

    printEmail(emailFromLink);
    const uniqueExternalLink = getUniqueValueFromTwoArray(
      allLinksArray,
      externalLink
    );
    linkToNextStep = removeNonUniqueElementFromArray(uniqueExternalLink);
  }

  const completedLink = getUniqueValueFromTwoArray(allLinksArray, linksArray);
  allLinksArray = allLinksArray.concat(completedLink);
  await main(allLinksArray, linkToNextStep, ++step);
}

await main([initialUrl], [initialUrl]);
