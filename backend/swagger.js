import fs from 'fs'
import path from 'path'

// Load all swagger files in a folder and merge them into one object to be used by swagger-ui-express
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