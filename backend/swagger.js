import swaggerJSDoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';

const swaggerDefinition = {
  openapi: "3.0.0",
  info: {
    title: "FairShare API",
    version: "1.0.0",
    description: "API for FairShare project",
  },
  servers: [
    {
      url: "http://localhost:5000",
      description: "Development server",
    }
  ]
}

const options = {
  swaggerDefinition,
  apis: ["./models/*.js", "./routes/*.js"]
}

const swaggerSpec = swaggerJSDoc(options)

const setupSwagger = (app) => {
  app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec))
}

export default setupSwagger