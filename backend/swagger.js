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
        }, "Task": {
          "type": "object",
          "properties": {
            "_id": {
              "type": "string",
              "example": "65d1f8a8c2a15b2f4d6a1b2c"
            },
            "title": {
              "type": "string",
              "description": "The title of the task",
              "example": "Algebra Homework"
            },
            "description": {
              "type": "string",
              "description": "A brief description of the task",
              "example": "Complete the exercises on linear equations from pages 45-50."
            },
            "estimatedTime": {
              "type": "number",
              "description": "Estimated time to complete the task (in minutes)",
              "example": 90
            },
            "timeLogged": {
              "type": "number",
              "description": "Total time logged for this task (in minutes)",
              "default": 0,
              "example": 30
            },
            "progress": {
              "type": "array",
              "description": "Progress tracking for each student assigned to the task",
              "items": {
                "type": "object",
                "properties": {
                  "student": {
                    "type": "string",
                    "description": "The ID of the student",
                    "example": "65d1f8a8c2a15b2f4d6a1d7e"
                  },
                  "timeWorked": {
                    "type": "number",
                    "description": "Total time the student has worked on the task (in minutes)",
                    "default": 0,
                    "example": 45
                  },
                  "completed": {
                    "type": "boolean",
                    "description": "Indicates whether the student has completed the task",
                    "default": false,
                    "example": true
                  },
                  "notes": {
                    "type": "string",
                    "description": "Notes related to the student's progress",
                    "example": "Struggled with problem 4, needs review."
                  },
                  "grade": {
                    "type": "number",
                    "description": "Grade assigned to the student for the task",
                    "minimum": 0,
                    "maximum": 100,
                    "example": 88
                  }
                }
              }
            },
            "taskWeight": {
              "type": "number",
              "description": "The weight of the task in relation to other tasks",
              "default": 0,
              "example": 5
            },
            "createdAt": {
              "type": "string",
              "format": "date-time",
              "description": "The date and time when the task was created",
              "example": "2024-02-03T12:34:56.789Z"
            },
            "updatedAt": {
              "type": "string",
              "format": "date-time",
              "description": "The date and time when the task was last updated",
              "example": "2024-02-04T15:22:31.456Z"
            }
          },
          "required": [
            "title",
            "estimatedTime",
            "taskWeight"
          ]
        }
      }
    }
  }
}


export default loadSwaggerFiles