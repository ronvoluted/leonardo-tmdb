import { useSession, signOut } from 'next-auth/react';

import { Button } from '@chakra-ui/react';

export default function SignInOutButton() {
  const { data: session } = useSession();

  if (!session) {
    return (
      <Button variant={'link'} as={'a'} href="/api/auth/signin" w="5em" pr={2} fontSize={'sm'} fontWeight={400}>
        Sign in
      </Button>
    );
  }

  return (
    <Button variant={'link'} onClick={() => signOut()} w="5em" pr={2} fontSize={'sm'} fontWeight={400}>
      Sign out
    </Button>
  );
}
