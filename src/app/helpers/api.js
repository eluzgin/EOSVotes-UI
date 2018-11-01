class API {

  get(uri) {
    return window.fetch('https://s3.amazonaws.com/api.eosvotes.io/eosvotes/tallies/' + uri); //TODO: restore process.env.API_LOCATION
  }

}

export const api = new API();
