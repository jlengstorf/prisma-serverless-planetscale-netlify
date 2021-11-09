import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

export async function handler() {
  try {
    const posts = await prisma.post.findMany();

    return {
      statusCode: 200,
      header: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(posts),
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify(error),
    };
  }
}
