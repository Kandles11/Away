const express = require('express');
const swaggerJsdoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');
const swaggerDefinition = require('../../docs/swaggerDef');

const router = express.Router();

const specs = swaggerJsdoc({
  swaggerDefinition,
  apis: ['src/docs/*.yml', 'src/routes/v1/*.js'],
});

console.log("Writing spec")
const OpenAPI = require('openapi-typescript-codegen')
OpenAPI.generate({
  input: specs,
  output: '../frontend/generated/client',
  httpClient: 'axios',
  useOptions: true,
  useUnionTypes: true,
  clientName: 'APIClient',
}).then(()=>{
  console.log("Done writing spec")

  router.use('/', swaggerUi.serve);
  router.get(
    '/',
    swaggerUi.setup(specs, {
      explorer: true,
    })
  );
})


module.exports = router;
