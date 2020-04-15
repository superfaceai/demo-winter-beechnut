//
// Set of routines to register and unregister Express app at Superface.ai registry
//

// Superface' self-driving client
const superdiver = require("superdriver");

// Where is this API deployed
const HOST = process.env.HOST || "https://ballistic-sombrero.glitch.me";

// What profile this service implements
const PROFILE_ID = "http://supermodel.io/superface/weather/profile/WeatherAlerts";

// URL of service asigned by the Superface registry
let serviceRegistryUrl = undefined;

// Register at Superface
async function register() {
  console.log("setting up... ");

  // Superface registry
  const registry = new superdiver.Register(process.env.REGISTRY_URL);

  // This provider representation in Superface registry
  const ServiceEntry = {
    serviceUrl: `${HOST}`,
    semanticProfile: PROFILE_ID,
    mappingUrl: `${HOST}/oas`
  };

  // Perform the registration
  return registry
    .registerService(ServiceEntry)
    .then(result => {
      console.log("registered service", result);
      serviceRegistryUrl = result.service.url;
    })
    .catch(error => {
      console.error("unable to register service:", error);
    });
}

// Unregister at Superface
async function unregister() {
  console.log("shutting down...", process.env.REGISTRY_URL, serviceRegistryUrl);

  // Superface registry
  const registry = new superdiver.Register(process.env.REGISTRY_URL);

  // Remove itself
  await registry
    .unregisterService({ serviceUrl: serviceRegistryUrl })
    .catch(err => {
      console.error("unable to unregister service", err);
      return Promise.reject(err) 
    });
}

module.exports = {
  register,
  unregister
}
