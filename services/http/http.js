import fetch from "node-fetch";
class Http {
  constructor() {}
  async load(url) {
    const makeRequest = (url) => fetch(url);

    let response = await makeRequest(url);

    if (response.status === 204) {
      return {};
    }

    return this.parseText(response);
  }

  parseText(response) {
    return response.text();
  }

  throwError(err) {
    throw err;
  }
}

export { Http };
