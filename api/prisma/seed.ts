import { PrismaClient } from '@prisma/client';
import { faker } from '@faker-js/faker';

const prisma = new PrismaClient();

prisma.result
  .createMany({
    data: [...Array(100)].map(() => ({
      repositoryName: faker.word.noun(),
      finding: {},
    })),
  })
  .then(() => {
    console.log('Result seeded');
  });
