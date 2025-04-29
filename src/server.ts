import { makeApp } from './app';
import loadConfig from './config/env';

loadConfig();

const port = Number(process.env.API_PORT) || 5001;
const host = String(process.env.API_HOST);

const startServer = async () => {
  try {
    const app = await makeApp();
    await app.listen({
      port,
      host,
    });
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
};

// Handle unhandled rejections
process.on('unhandledRejection', (err) => {
  console.error('Unhandled Rejection:', err);
  process.exit(1);
});

startServer();
