// eslint-disable-next-line @typescript-eslint/no-var-requires
const { generateService } = require('@umijs/openapi');

generateService({
  schemaPath: 'http://petstore.swagger.io/v2/swagger.json',
  serversPath: './src/servers',
  requestLibPath: '@/utils/request',
});
