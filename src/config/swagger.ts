import { registerAs } from '@nestjs/config';

export default registerAs('swagger', () => ({
  enabled: process.env.SWAGGER_ENABLED || false,
  title: process.env.SWAGGER_TITLE || process.env.APP_NAME || 'Swagger',
  description: process.env.SWAGGER_DESCRIPTION || 'Swagger Description',
  path: process.env.SWAGGER_PATH || 'api/documentation',
}));
