import parseUrl from "parse-url";

const removePathFromUrl = (url) => {
  if (!url.match("https://") && !url.match("http://")) {
    throw `incorrect url ${url}`;
  }

  if (url.match("https://")) {
    url = url.replace(/(.*)https:\/\//, "");
    return `https://${url}`;
  }

  url = url.replace(/(.*)http:\/\//, "");
  return `http://${url}`;
};
const getDomainFromUrl = (url) => {
  if (url) {
    url = removePathFromUrl(url);
    url = url.replace("//", "*");
    url = url.replace(/\/(.*)/, "");
    url = url.replace("*", "//");
    return parseUrl(url).resource;
  }
};

export { getDomainFromUrl };
