'use client';

import { useContext } from 'react';
import { Button, Heading, Text } from '@chakra-ui/react';

import { UserContext } from '$UserProvider';
import { WelcomeContext } from '$WelcomeProvider';

export default function MoviesHeader() {
  const { userDetails } = useContext(UserContext);
  const { isOpen, onOpen } = useContext(WelcomeContext);

  const jobTitle = isOpen ? userDetails.currentJobTitle : userDetails.jobTitle;

  return (
    <Heading as="h2" my={12} textAlign="center">
      {jobTitle && (
        <Text display="inline" fontSize="3xl" fontWeight={700}>
          {jobTitle.charAt(0).toUpperCase() + jobTitle.substring(1)}?
        </Text>
      )}{' '}
      <Text display="inline" fontSize="3xl" fontWeight={700}>
        <Button
          variant="link"
          onClick={() => onOpen()}
          display="inline"
          fontSize="3xl"
          fontWeight={700}
          color={'blue.400'}
        >
          You
        </Button>{' '}
        might like these:
      </Text>
    </Heading>
  );
}
