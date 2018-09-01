class API {

  get(uri) {
    return window.fetch('https://api.eosvotes.io/' + uri); //TODO: restore process.env.API_LOCATION
  }

}

export const api = new API();
