import { useSession, signOut } from 'next-auth/react';

import { Box, Button } from '@chakra-ui/react';

export default function SignInOutButton() {
  const { data: session, status } = useSession();

  if (status === 'unauthenticated') {
    return (
      <Button
        variant={'link'}
        as={'a'}
        href="/api/auth/signin"
        w={{ base: '3em', md: '5em' }}
        pr={2}
        fontSize={'sm'}
        fontWeight={600}
      >
        Sign in
      </Button>
    );
  }

  if (status === 'authenticated') {
    return (
      <Button
        variant={'link'}
        onClick={() => signOut()}
        w={{ base: '3em', md: '5em' }}
        pr={2}
        fontSize={'sm'}
        fontWeight={600}
      >
        Sign out
      </Button>
    );
  }
}
