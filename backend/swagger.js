import swaggerJSDoc from 'swagger-jsdoc'
import swaggerUi from 'swagger-ui-express'
import fs from 'fs'
import path from 'path'


// const swaggerDefinition = {
//   openapi: "3.0.0",
//   info: {
//     title: "FairShare API",
//     version: "1.0.0",
//     description: "API for FairShare project",
//   },
//   servers: [
//     {
//       url: "http://localhost:5000",
//       description: "Development server",
//     }
//   ]
// }

// const options = {
//   swaggerDefinition,
//   apis: ["./models/*.js", "./routes/*.js"]
// }

// const swaggerSpec = swaggerJSDoc(options)

// const setupSwagger = (app) => {
//   app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec))
// }

const loadSwaggerFiles = (folderPath) => {
  const files = fs.readdirSync(folderPath)
  const mergedPaths = files.reduce((acc, file) => {
    const filePath = path.join(folderPath, file)
    const fileContents = JSON.parse(fs.readFileSync(filePath, 'utf8'))
    return { ...acc, ...fileContents }
  }, {})

  return {
    openapi: '3.0.0',
    info: {
      title: 'Your API',
      version: '1.0.0',
      description: 'API documentation for your app'
    },
    paths: mergedPaths
  }
}



export default loadSwaggerFiles