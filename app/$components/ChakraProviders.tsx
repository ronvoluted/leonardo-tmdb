'use client';

import { CacheProvider } from '@chakra-ui/next-js';
import { ChakraProvider, cookieStorageManagerSSR, localStorageManager } from '@chakra-ui/react';

export default function ChakraProviders({ cookies, children }: { cookies: string; children: React.ReactNode }) {
  const colorModeManager = typeof cookies === 'string' ? cookieStorageManagerSSR(cookies) : localStorageManager;

  return (
    <CacheProvider>
      <ChakraProvider colorModeManager={colorModeManager}>{children}</ChakraProvider>
    </CacheProvider>
  );
}
