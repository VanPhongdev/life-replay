import 'dotenv/config';
import app from './app.js';
import prisma from './lib/prisma.js';

const PORT: number = Number(process.env.PORT) || 3000;

const start = async (): Promise<void> => {
  const statuses = {
    prisma: false,
    redis: false,
    cloudinary: false,
  };

  try {
    await prisma.$connect();
    statuses.prisma = true;
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error('Prisma (DB) connection error:', error.message);
    } else {
      console.error('Prisma (DB) connection error:', error);
    }
  }

  const statusLines: string[] = [];

  statusLines.push(`Server starting on port ${PORT}`);
  statusLines.push(
    `DB (Prisma): ${statuses.prisma ? 'connected' : 'failed'}`
  );

  console.log(statusLines.join('\n'));

  app.listen(PORT, () => {
    console.log(`Server is listening on http://localhost:${PORT}`);
  });
};

start().catch((err: unknown) => {
  console.error('Failed to start server:', err);
  process.exit(1);
});