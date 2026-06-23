import 'dotenv/config';
import app from './app.js';
import prisma from './lib/prisma.js';

const PORT = process.env.PORT || 3000;

const startServer = async () => {
  const status = {
    prisma: false,
  }

  try {
    await prisma.$connect();
    status.prisma = true;
  } catch (error) {
    console.error('Error connecting to Prisma:', error.message || error);
  }

  const statusLine = []
  statusLine.push(`Server starting on port ${PORT}`);
  statusLine.push(`DB (Prisma): ${status.prisma ? 'Connected' : 'failed'}`);
  console.log(statusLine.join('\n'));
}

startServer().catch((error) => {
  console.error('Error starting server:', error.message || error);
  process.exit(1);
})