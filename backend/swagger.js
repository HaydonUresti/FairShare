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
    paths: mergedPaths,
    "components": {
      "schemas": {
        "Group": {
          "type": "object",
          "properties": {
            "_id": {
              "type": "string",
              "example": "65d1f8a8c2a15b2f4d6a1a7b"
            },
            "name": {
              "type": "string",
              "example": "Math Study Group"
            },
            "owner": {
              "type": "string",
              "example": "65d1f8a8c2a15b2f4d6a1a7b"
            },
            "members": {
              "type": "array",
              "items": {
                "type": "string"
              },
              "example": [
                "65d1f8a8c2a15b2f4d6a1a7b",
                "65d1f8a8c2a15b2f4d6a1a7c"
              ]
            }
          }
        },
        "User": {
          "type": "object",
          "properties": {
            "_id": {
              "type": "string",
              "example": "65d1f8a8c2a15b2f4d6a1a7b",
            },
            "name": {
              "type": "string",
              "example": "Bob Ross"
            },
            "email": {
              "type": "string",
              "example": "example@email.com"
            },
            "password": {
              "type": "string",
              "example": "password"
            },
            "userRole": {
              "type": "string",
              "example": "Student"
            },
            "groups": {
              "type": "array",
              "items": {
                "type": "string"
              },
              "example": [
                "65d1f8a8c2a15b2f4d6a1a7b",
                "65d1f8a8c2a15b2f4d6a1a7c"
              ]
            }
          }
        }
      }
    }
  }
}


export default loadSwaggerFiles