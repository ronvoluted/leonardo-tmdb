'use client';

import { useEffect } from 'react';
import { useDisclosure } from '@chakra-ui/react';

import Hero from '$Hero';
import Signup from '$SignUp';

const signUpParamIsError = (searchParam: string | string[]): searchParam is Auth.SignUpError => {
  return typeof searchParam === 'string' && ['email-exists', 'username-exists'].includes(searchParam);
};

export default function Home({ searchParams }: { searchParams: Record<string, string | string[]> }) {
  const { getButtonProps, getDisclosureProps, onClose, onOpen } = useDisclosure({ defaultIsOpen: false });

  const signUpError = signUpParamIsError(searchParams.signup) ? searchParams.signup : undefined;

  useEffect(() => {
    if (signUpError) {
      onOpen();
    }

    const handleKeyup = (e: KeyboardEvent) => {
      if (e.key && e.key.toUpperCase() === 'ESCAPE') {
        onClose();
      }
    };

    document.addEventListener('keyup', handleKeyup);

    return () => {
      document.removeEventListener('keydown', handleKeyup);
    };
  }, []);

  return (
    <>
      <Signup error={signUpError} getButtonProps={getButtonProps} getDisclosureProps={getDisclosureProps} />

      <Hero getButtonProps={getButtonProps} />
    </>
  );
}
