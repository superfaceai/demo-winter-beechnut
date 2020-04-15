const bodyParser = require("body-parser");
const swaggerUi = require("swagger-ui-express");

const alertsRouter = require("./alerts");
const shutdownRouter = require("./shutdown");
const yaml = require("./yaml");
const { version } = require("./versions");

function setupAPIRoutes(app) {
  // CORS
  app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET, POST, PATCH, PUT, DELETE, OPTIONS");
    res.header(
      "Access-Control-Allow-Headers",
      "Origin, X-Requested-With, Content-Type, Accept"
    );
    next();
  });

  // Parse JSONs
  app.use(bodyParser.json());

  // Retrieve weather alerts endpoint
  app.use(version.path, alertsRouter);

  // Endpoint that serves the OpenAPI (f.k.a. Swagger) specification
  app.get("/oas", (req, res) => {
    res.send(swaggerDocument);
  });

  // Shutdown endpoint – unregister the service
  app.use("/shutdown", shutdownRouter);

  // Serve Swagger UI - API Documentation as the home page
  app.use(
    "/",
    swaggerUi.serve,
    swaggerUi.setup(swaggerDocument, swaggerOptions)
  );

  // Handle 404s
  app.use((req, res) => {
    res.status(404);
    res.send({ titke: "Not found" });
  });
}

// Swagger UI Options
const swaggerOptions = {
  customCss: ".swagger-ui .topbar { display: none }",
  swaggerOptions: {
    docExpansion: "full"
  }
};

// Load the OAS for displaying and serving
const swaggerDocument = yaml.readYAMLFile(version.oas);

module.exports = {
  setupAPIRoutes
};
