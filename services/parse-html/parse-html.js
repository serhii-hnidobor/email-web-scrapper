import { parse } from "node-html-parser";
import {
  EMAIL_REGEXP,
  EMAIL_ONE_LETTER_USER_NAME_REGEXP,
} from "../../constants/regexp/regexp.js";
import {
  getUniqueValueFromTwoArray,
  removeGivenSymbolFromEnd,
  removeNonUniqueElementFromArray,
} from "../../helpers/helpers.js";
import { getDomainFromUrl } from "../../helpers/string/get-doman-from-url.js";
class HtmlParser {
  root;
  emailHistoryArray;
  url;
  constructor(html, url) {
    this.root = parse(html);
    this.url = removeGivenSymbolFromEnd(url, "/");
    this.emailHistoryArray = [];
  }

  setHtml(newHtml, newUrl) {
    this.root = parse(newHtml);
    this.url = removeGivenSymbolFromEnd(newUrl, "/");
  }

  isLinkExternal(link) {
    if (!link.match("https://") && !link.match("http://")) {
      return false;
    }
    const linkDomain = getDomainFromUrl(link);

    return !!linkDomain;
  }

  getAllEmail() {
    const bodyElement = this.root.querySelector("body");

    if (bodyElement) {
      let bodyElementString = bodyElement.innerHTML;

      let newEmail = removeNonUniqueElementFromArray(
        bodyElementString.match(EMAIL_REGEXP)
      );

      //for email like i@madappgang.com
      const emailWithOneLetterUserNameArray = bodyElementString.match(
        EMAIL_ONE_LETTER_USER_NAME_REGEXP
      );

      if (emailWithOneLetterUserNameArray) {
        const filteredEmailWithOneLetter =
          emailWithOneLetterUserNameArray.filter(
            (email) => email.length < 20 && email[1] === "@"
          );

        newEmail = newEmail
          ? newEmail.concat(
              getUniqueValueFromTwoArray(newEmail, filteredEmailWithOneLetter)
            )
          : filteredEmailWithOneLetter;
      }

      const uniqueEmailFormText = getUniqueValueFromTwoArray(
        this.emailHistoryArray,
        newEmail || []
      );

      this.emailHistoryArray =
        this.emailHistoryArray.concat(uniqueEmailFormText);

      return uniqueEmailFormText;
    }
  }
  getALlLink() {
    const allHrefArray = this.getAllAnchorsHref();
    const parsedHref = this.parseHref(allHrefArray);
    const result = [];

    for (const hrefObj of parsedHref) {
      const hrefValue = removeGivenSymbolFromEnd(hrefObj.value, "/");

      if (
        hrefValue.includes("/") &&
        !hrefValue.includes("#") &&
        !result.includes(hrefValue)
      ) {
        const link = hrefObj.isExternal ? hrefValue : `${this.url}${hrefValue}`;
        result.push(link);
      }
    }

    return removeNonUniqueElementFromArray(result);
  }
  parseHref(hrefArray) {
    return hrefArray.map((href) => {
      return {
        value: href,
        isExternal: this.isLinkExternal(href),
      };
    });
  }

  getAllAnchorsHref() {
    const allAnchors = this.root.querySelectorAll("body *[href]");
    const allHref = allAnchors
      .map((anchor) => anchor.getAttribute("href"))
      .filter((href) => !!href);
    return allHref.filter((href) => href !== "/" && !href.includes("/#"));
  }
}

export { HtmlParser };
