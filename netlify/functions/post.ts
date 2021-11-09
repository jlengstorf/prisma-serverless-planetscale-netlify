import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

export async function handler(event) {
  const { title, content } = JSON.parse(event.body);

  try {
    await prisma.post.create({
      data: { title, content },
    });

    return {
      statusCode: 200,
      body: 'post created',
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify(error),
    };
  }
}
