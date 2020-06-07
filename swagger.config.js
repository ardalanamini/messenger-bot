const pkg = require("./package.json");

module.exports = {
  openapi: "3.0.0",
  info: {
    title: pkg.name,
    version: pkg.version,
  },
  servers: [
    {
      url: "http://localhost:3000",
      description: "Staging API",
    },
  ],
  host: "localhost",
  basePath: "",
  schemas: ["http"],
  consumes: ["application/json"],
  produces: ["application/json"],
};
