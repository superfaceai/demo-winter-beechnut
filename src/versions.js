//
// What API version is the service implementing
//
const API_VERSION = "v1";

// Dictionary of the versions of the API, documented in the corresponding OAS files
const versions = {
  v1: {
    path: "/meteo/actuelle",
    oas: "./design/meteo-1.0.oas3.yaml",
    method: "POST",
    localityParameter: "city"
  }
};

module.exports = {
  version: versions[API_VERSION]
};
