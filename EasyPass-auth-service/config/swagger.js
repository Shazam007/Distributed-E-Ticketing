const swaggerJsdoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");

const options = {
    definition: {
      openapi: "3.1.0",
      info: {
        title: "Seizon API with Swagger",
        version: "0.1.0",
        description:
          "This is Seizon API application made with Express and documented with Swagger",
      },
      servers: [
        {
          url: "http://localhost:8081",
        },
      ],
    },
    apis: ["./routes/*.js"],
  };
  
  const specs = swaggerJsdoc(options);

  module.exports = (app) => {
    app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs, { explorer: true }))
}
