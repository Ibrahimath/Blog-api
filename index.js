const express = require('express')
const displayRoutes = require('express-routemap');
const app = express()
const bodyParser = require('body-parser')

const userRoutes = require('./routes/userRoutes')
const port = process.env.PORT || 3001
const swaggerJSDoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express")


app.use(bodyParser.json())
app.use('/blog', userRoutes)



const swaggerDefinition = {
    openapi: "3.0.0",
    info: {
      title: "Social Media API",
      version: "1.0.0",
      description: "Best platform  app",
      license: {
        name: "zulfah",
        url: "",
      },
      contact: {
        name: "us",
        url: "",
      },
    },
    servers: [
      {
        url: `http://localhost:${port}/api/v1`,
        description: "Development server",
        },
        {
            url: `api.carbon-test.com`,
            description: "Prod server",
          },
    ],
  };

  const options = {
    swaggerDefinition,
    apis: [`./routes/*.js`],
  };
  const swaggerSpec = swaggerJSDoc(options);

 app.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

 
 app.listen(port, displayRoutes(app));
