'use client';

import { useState } from 'react';

import {
  Flex,
  Box,
  FormControl,
  FormLabel,
  Input,
  InputGroup,
  InputRightElement,
  Stack,
  Button,
  Heading,
  Text,
  useColorModeValue,
  Link,
  CloseButton,
  keyframes,
  usePrefersReducedMotion,
  type useDisclosure,
} from '@chakra-ui/react';
import { ViewIcon, ViewOffIcon } from '@chakra-ui/icons';
import { motion } from 'framer-motion';

type SignUpProps = {
  error?: Auth.SignUpError;
  getButtonProps: ReturnType<typeof useDisclosure>['getButtonProps'];
  getDisclosureProps: ReturnType<typeof useDisclosure>['getDisclosureProps'];
};

const expandFrames = keyframes`
  from { scale: 0; opacity: 0; border-radius: 5%; }
  80% { scale: 1; opacity: 1; border-radius: 0; }
`;

export default function SignUp({ error, getButtonProps, getDisclosureProps }: SignUpProps) {
  const prefersReducedMotion = usePrefersReducedMotion();

  const [showPassword, setShowPassword] = useState(false);

  return (
    <Flex
      {...getDisclosureProps()}
      as={motion.div}
      position="absolute"
      w={'100%'}
      py={20}
      align={'center'}
      justify={'center'}
      bg={useColorModeValue('blue.400', 'blue.600')}
      zIndex={1}
      animation={prefersReducedMotion ? 'none' : `${expandFrames} 1s ease-in-out 1`}
    >
      <Stack as={motion.div} spacing={8} mx={'auto'} maxW={'lg'} py={12} pt={0} px={6}>
        <CloseButton {...getButtonProps()} size="lg" position="absolute" top={5} right={5} zIndex={2} />

        <Stack align={'center'} color="gray.50">
          <Heading fontSize={'4xl'} textAlign={'center'}>
            Get tickets
          </Heading>
          <Text fontSize={'lg'}>to be seated as an authenticated filmgoer</Text>
        </Stack>

        {error === 'email-exists' && (
          <Box rounded={'lg'} bg={useColorModeValue('white', 'orange.500')} boxShadow={'lg'} p={2} mb={-4}>
            <Text align={'center'}>Email already in use</Text>
          </Box>
        )}

        <Box rounded={'lg'} bg={useColorModeValue('white', 'gray.600')} boxShadow={'lg'} p={8}>
          <Stack as="form" spacing={4} method="POST" action="/api/user/signup">
            <FormControl id="email" isRequired>
              <FormLabel>Email address</FormLabel>
              <Input type="email" name="email" autoComplete="email" />
            </FormControl>
            <FormControl id="password" isRequired>
              <FormLabel>Password</FormLabel>
              <InputGroup>
                <Input type={showPassword ? 'text' : 'password'} name="password" autoComplete="current-password" />
                <InputRightElement h={'full'}>
                  <Button variant={'ghost'} onClick={() => setShowPassword((showPassword) => !showPassword)}>
                    {showPassword ? <ViewIcon /> : <ViewOffIcon />}
                  </Button>
                </InputRightElement>
              </InputGroup>
            </FormControl>
            <Stack spacing={10} pt={2}>
              <Button
                type="submit"
                loadingText="Submitting"
                size="lg"
                bg={'blue.400'}
                color={'white'}
                _hover={{
                  bg: 'blue.500',
                }}
              >
                Sign up
              </Button>
            </Stack>
            <Stack pt={6}>
              <Text align={'center'}>
                Already a user?{' '}
                <Link href="/api/auth/signin" color={'blue.400'}>
                  Sign in
                </Link>
              </Text>
            </Stack>
          </Stack>
        </Box>
      </Stack>
    </Flex>
  );
}
