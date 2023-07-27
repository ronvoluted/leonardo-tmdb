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
} from '@chakra-ui/react';
import { ViewIcon, ViewOffIcon } from '@chakra-ui/icons';

type SignInFormProps = {
  appUrl: string;
  searchParams: Record<string, string | string[]>;
};

export default function SignInForm({ appUrl, searchParams }: SignInFormProps) {
  const [csrfToken, setCsrfToken] = useState('');
  const [emailOrUsername, setEmailOrUsername] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const isEmail = emailOrUsername.includes('@');

  const error = typeof searchParams.error === 'string' ? searchParams.error : undefined;

  fetch(`${appUrl}/api/auth/csrf`)
    .then((res) => res.json())
    .then((json) => setCsrfToken(json.csrfToken))
    .catch((err) => console.error(err));

  return (
    <Flex
      w={'100%'}
      h={'calc(100vh - 60px)'}
      py={'250px'}
      align={'center'}
      justify={'center'}
      bg={useColorModeValue('blue.400', 'blue.600')}
    >
      <Stack spacing={8} mx={'auto'} maxW={'lg'} py={12} pt={0} px={6}>
        <Stack align={'center'} color="gray.50">
          <Heading fontSize={'4xl'} textAlign={'center'}>
            Take your seat
          </Heading>
          <Text fontSize={'lg'}>as an authenticated filmgoer</Text>
        </Stack>

        {error && (
          <Box rounded={'lg'} bg={useColorModeValue('white', 'orange.500')} boxShadow={'lg'} p={2} mb={-4}>
            <Text align={'center'} px={2}>
              Please check seat number and try again
            </Text>
          </Box>
        )}

        <Box rounded={'lg'} bg={useColorModeValue('white', 'gray.600')} boxShadow={'lg'} p={8}>
          <form method="POST" action="/api/auth/callback/credentials">
            <Stack spacing={4}>
              <input type="hidden" name="csrfToken" defaultValue={csrfToken} />
              <input type="hidden" name="callbackUrl" value="/movies" />

              <FormControl id="email" isRequired>
                <FormLabel>Email or username</FormLabel>
                <Input
                  type={isEmail ? 'email' : 'text'}
                  name={isEmail ? 'email' : 'username'}
                  autoComplete={isEmail ? 'email' : 'username'}
                  value={emailOrUsername}
                  onChange={(e) => setEmailOrUsername(e.target.value)}
                />
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
                  Sign in
                </Button>
              </Stack>
            </Stack>
          </form>
        </Box>
      </Stack>
    </Flex>
  );
}
