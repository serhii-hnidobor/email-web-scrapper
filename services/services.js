import { Http } from "./http/http.js";
import { HtmlParser } from "./parse-html/parse-html.js";

const http = new Http();
const htmlParser = new HtmlParser("");

export { http, htmlParser };
