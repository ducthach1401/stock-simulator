import { registerAs } from '@nestjs/config';

export default registerAs('app', () => ({
  name: process.env.APP_NAME,
  port: process.env.APP_PORT,
  debug: process.env.APP_DEBUG,
}));
