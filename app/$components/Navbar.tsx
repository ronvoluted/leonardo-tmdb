'use client';

import Image from 'next/image';
import Link from 'next/link';

import { Box, Flex, Text, Stack, useColorModeValue, useBreakpointValue } from '@chakra-ui/react';

import ColorModeToggle from '$ColorModeToggle';
import SignInOutButton from '$SignInOutButton';

export default function Navbar() {
  return (
    <Box>
      <Flex
        minH={'60px'}
        align={'center'}
        justify="center"
        justifyItems={'center'}
        justifyContent={'center'}
        px={{ base: 4 }}
        py={{ base: 2 }}
        bg={useColorModeValue('white', 'gray.800')}
        color={useColorModeValue('gray.600', 'white')}
        borderBottom={1}
        borderStyle={'solid'}
        borderColor={useColorModeValue('gray.200', 'gray.900')}
        zIndex={10}
      >
        <Flex flex={{ base: 1 }} justify="start" gap={4}>
          <Link href="/">
            <Box position="relative" w="32px" h="32px" p={0}>
              <Image src="/favicon-32x32.png" alt="Leonardo TMDB" fill={true} />
            </Box>
          </Link>

          <Link href="/" style={{ margin: 'auto 0' }}>
            <Text
              display={{ base: 'none', md: 'block' }}
              textAlign={useBreakpointValue({ base: 'center', md: 'left' })}
              fontWeight="600"
              whiteSpace={'nowrap'}
            >
              Leonardo TMDB
            </Text>
          </Link>
        </Flex>

        <Stack w="100%">
          <Text mx="auto" fontWeight="semibold">
            <Text display={{ base: 'none', md: 'inline' }}>Hello </Text>
            <Text display="inline">{'dave9000dave9000'}</Text>
          </Text>
        </Stack>

        <Stack flex={{ base: 1, md: 0 }} justify={'flex-end'} direction={'row'} spacing={6}>
          <ColorModeToggle />

          <SignInOutButton />
        </Stack>
      </Flex>
    </Box>
  );
}
