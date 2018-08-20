class API {

  get(uri) {
    return window.fetch(process.env.API_LOCATION + uri);
  }

}

export const api = new API();
