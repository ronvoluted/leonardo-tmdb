'use client';

import { useEffect } from 'react';
import { useDisclosure } from '@chakra-ui/react';

import styles from '@css/page.module.css';

import Hero from '$Hero';
import Signup from '$SignUp';

export default function Home() {
  const { getButtonProps, getDisclosureProps, onClose } = useDisclosure({ defaultIsOpen: false });

  useEffect(() => {
    const handleKeyup = (e: KeyboardEvent) => {
      if (e.key.toUpperCase() === 'ESCAPE') {
        onClose();
      }
    };

    document.addEventListener('keyup', handleKeyup);

    return () => {
      document.removeEventListener('keydown', handleKeyup);
    };
  }, []);

  return (
    <main className={styles.main}>
      <Signup getButtonProps={getButtonProps} getDisclosureProps={getDisclosureProps} />

      <Hero getButtonProps={getButtonProps} />
    </main>
  );
}
