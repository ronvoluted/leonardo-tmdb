import NextAuth, { type AuthOptions } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import { PrismaAdapter } from '@next-auth/prisma-adapter';
import { prisma } from '@prismaClient';
import { hashCheck } from '@hash';

type AuthOptionsWithStrategy = AuthOptions & {
  session: {
    strategy: string;
  };
};

export const authOptions: AuthOptionsWithStrategy = {
  adapter: PrismaAdapter(prisma),
  session: {
    strategy: 'jwt',
  },
  providers: [
    CredentialsProvider({
      name: 'Email or username',
      credentials: {
        email: {
          type: 'email',
          label: 'Email or username',
          placeholder: 'filmgoer or  filmgoer@email.org',
        },
        username: {
          type: 'text',
          label: 'Email or username',
          placeholder: 'filmgoer or  filmgoer@email.org',
        },
        password: {
          type: 'password',
          label: 'Password',
        },
      },
      authorize: async (credentials) => {
        if ((!credentials?.email && !credentials?.username) || !credentials?.password) {
          return null;
        }

        try {
          const user = await prisma.user.findFirst({
            where: {
              OR: [{ email: credentials.email }, { username: credentials.username }],
            },
          });

          if (!user || (await hashCheck(credentials.password, user.password, user.salt)) !== true) {
            return null;
          }

          return {
            id: user.id.toString(),
            email: user.email,
            username: user.username,
            job_title: user.job_title,
          };
        } catch (err) {
          console.error(err instanceof Error ? err.message : 'Prisma error finding user');

          return null;
        }
      },
    }),
  ],
  pages: {
    signIn: '/user/signin',
  },
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
