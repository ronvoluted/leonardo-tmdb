import type { Prisma } from '@prisma/client';
import { prisma } from '../app/@modules/prismaClient';
import { hash } from '../app/@modules/hash';

const createUsers = async (): Promise<Prisma.UserCreateInput[] | undefined> => {
  const users = [
    { email: 'cinema@email.org', password: 'cinema', username: 'cinema', job_title: 'Beach' },
    { email: 'theatre@email.org', password: 'theatre', username: 'theatre' },
    { email: 'screen@email.org', password: 'screen' },
  ];

  return await Promise.all(
    users.map(async (user) => {
      const passwordHash = await hash(user.password);

      if (!passwordHash) throw new Error('Unable to hash password');

      return {
        ...user,
        password: passwordHash.derivedKey,
        salt: passwordHash.salt,
      };
    })
  );
};

const main = async () => {
  try {
    const users = await createUsers();

    if (!users) {
      return;
    }

    const userUpserts = users.map((user) =>
      prisma.user.upsert({
        where: { email: user.email },
        create: { ...user },
        update: {},
      })
    );

    await Promise.all(userUpserts);

    console.log('Upserted users:', users);
  } catch (err) {
    console.error((err instanceof Error && err.message) || 'Error upserting users');
  } finally {
    prisma.$disconnect();
  }
};

main();
