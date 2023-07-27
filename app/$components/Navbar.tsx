'use client';

import Image from 'next/image';
import Link from 'next/link';

import {
  Box,
  Flex,
  Text,
  IconButton,
  Stack,
  useColorModeValue,
  useBreakpointValue,
  useDisclosure,
} from '@chakra-ui/react';
import { HamburgerIcon, CloseIcon, ChevronDownIcon, ChevronRightIcon } from '@chakra-ui/icons';

import ColorModeToggle from '$ColorModeToggle';
import SignInOutButton from '$SignInOutButton';

export default function Navbar() {
  const { isOpen, onToggle } = useDisclosure();

  return (
    <Box>
      <Flex
        bg={useColorModeValue('white', 'gray.800')}
        color={useColorModeValue('gray.600', 'white')}
        minH={'60px'}
        py={{ base: 2 }}
        px={{ base: 4 }}
        borderBottom={1}
        borderStyle={'solid'}
        borderColor={useColorModeValue('gray.200', 'gray.900')}
        align={'center'}
        zIndex={100}
      >
        <Flex flex={{ base: 1, md: 'auto' }} ml={{ base: -2 }} display={{ base: 'flex', md: 'none' }}>
          <IconButton
            onClick={onToggle}
            icon={isOpen ? <CloseIcon w={3} h={3} /> : <HamburgerIcon w={5} h={5} />}
            variant={'ghost'}
            aria-label={'Toggle Navigation'}
          />
        </Flex>
        <Flex flex={{ base: 1 }} justify={{ base: 'center', md: 'start' }} gap={4}>
          <Link href="/">
            <Box position="relative" w="32px" h="32px" p={0}>
              <Image src="/favicon-32x32.png" alt="Leonardo TMDB" fill={true} />
            </Box>
          </Link>

          <Link href="/" style={{ margin: 'auto 0' }}>
            <Text
              textAlign={useBreakpointValue({ base: 'center', md: 'center' })}
              fontWeight="600"
              whiteSpace={'nowrap'}
            >
              Leonardo TMDB
            </Text>
          </Link>
        </Flex>

        <Stack flex={{ base: 1, md: 0 }} justify={'flex-end'} direction={'row'} spacing={6}>
          <ColorModeToggle />

          <SignInOutButton />
        </Stack>
      </Flex>
    </Box>
  );
}
