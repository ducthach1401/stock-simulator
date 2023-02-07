module.exports = {
  apps: [
    {
      name: 'app',
      cwd: '/var/www',
      script: './dist/main.js',
      exec_mode: process.env.PM2_EXEC_MODE,
      instances: process.env.PM2_INSTANCES,
    },
  ],
};
