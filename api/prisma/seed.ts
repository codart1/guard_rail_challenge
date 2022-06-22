import { PrismaClient, Status } from '@prisma/client';
import { faker } from '@faker-js/faker';

const prisma = new PrismaClient();

const mockFindings = {
  findings: [
    {
      type: 'sast',
      ruleId: 'G402',
      location: {
        path: 'connectors/apigateway.go',
        positions: {
          begin: {
            line: 60,
          },
        },
      },
      metadata: {
        description: 'TLS InsecureSkipVerify set true.',
        severity: 'HIGH',
      },
    },
    {
      type: 'sast',
      ruleId: 'G404',
      location: {
        path: 'util/util.go',
        positions: {
          begin: {
            line: 32,
          },
        },
      },
      metadata: {
        description:
          'Use of weak random number generator (math/rand instead of crypto/rand)',
        severity: 'HIGH',
      },
    },
  ],
};

(async () => {
  await prisma.result.deleteMany();
  await prisma.result.createMany({
    data: [...Array(20)].map(() => ({
      repositoryName: faker.word.noun(),
      finding: mockFindings,
      status: faker.helpers.arrayElement(Object.values(Status)),
      queuedAt: faker.date.past(),
      scanningAt: faker.date.past(),
      finishedAt: faker.date.past(),
    })),
  });
  console.log('Result seeded');
})();
