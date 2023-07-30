'use client';

import { ChangeEventHandler, useContext, useEffect, useRef, useState } from 'react';
import {
  Progress,
  Box,
  ButtonGroup,
  Button,
  Heading,
  Flex,
  FormControl,
  FormLabel,
  Input,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
  Tooltip,
  useDisclosure,
  useToast,
} from '@chakra-ui/react';

import { UserContext } from '$UserProvider';
import { WelcomeContext } from '$WelcomeProvider';

const patternMessage =
  'Must be 1-15 characters long and contain only lowercase letters, numbers, or underscores' as const;

export default function WelcomeModal() {
  const { userDetails, setUserDetails } = useContext(UserContext);
  const { isOpen, onClose, onOpen } = useContext(WelcomeContext);

  const toast = useToast();
  const [step, setStep] = useState(1);
  const [progress, setProgress] = useState(50);
  const [usernameInvalid, setUsernameInvalid] = useState(false);
  const usernameInput = useRef<HTMLInputElement>(null);
  const jobTitleInput = useRef<HTMLInputElement>(null);

  const navigateToUsername = () => {
    setStep(1);
    setProgress(50);

    usernameInput.current?.focus();
  };

  const navigateToJobTitle = () => {
    setStep(2);
    setProgress(100);

    jobTitleInput.current?.focus();
  };

  const closeCancel = () => {
    setUserDetails({
      ...userDetails,
      username: userDetails.currentUsername,
      jobTitle: userDetails.currentJobTitle,
    });

    onClose();
  };

  const handleUsernameChange: ChangeEventHandler<HTMLInputElement> = ({ target: { value, validity } }) => {
    setUserDetails({ ...userDetails, username: value });
    setUsernameInvalid(validity.valueMissing || validity.patternMismatch || validity.tooLong);
  };

  const handleSubmit = () => {
    if (userDetails.username === userDetails.currentUsername && userDetails.jobTitle === userDetails.currentJobTitle) {
      toast({
        title: 'No changes made',
        description: 'Your username and job title remain the same',
        status: 'info',
        duration: 3_000,
        isClosable: true,
      });

      onClose();

      return;
    }

    fetch('/api/user/update/', {
      method: 'POST',
      body: JSON.stringify({
        email: userDetails.email,
        username: userDetails.username,
        jobTitle: userDetails.jobTitle,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          toast({
            title: 'All done!',
            description: 'Your details have been saved',
            status: 'info',
            duration: 3_000,
            isClosable: true,
          });
        }
      })
      .catch((err) => {
        console.error(err);
      })
      .finally(() => onClose());
  };

  useEffect(() => {
    if (!userDetails.username || !userDetails.jobTitle) {
      onOpen();
    }
  }, []);

  return (
    <>
      <Modal isCentered isOpen={isOpen} onClose={closeCancel} size="xl">
        <ModalOverlay backdropFilter="blur(6px)" />;
        <ModalContent>
          <ModalHeader>
            <Heading w="100%" mt={3} textAlign={'center'} fontWeight="semibold">
              🎉 Welcome! 🎉
            </Heading>
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Box as="form" borderWidth="1px" rounded="lg" shadow="1px 1px 3px rgba(0,0,0,0.3)" maxWidth={800} p={6}>
              <FormControl isRequired display={step === 1 ? 'block' : 'none'}>
                <FormLabel htmlFor="username" fontWeight={'normal'}>
                  Choose a username
                </FormLabel>
                <Tooltip label={patternMessage} isOpen={step === 1 && usernameInvalid} hasArrow>
                  <Input
                    ref={usernameInput}
                    id="username"
                    title={patternMessage}
                    value={userDetails.username || ''}
                    onChange={handleUsernameChange}
                    onKeyUp={(e) => {
                      if (!usernameInvalid && e.key === 'Enter') {
                        navigateToJobTitle();
                      }
                    }}
                    pattern="[a-z0-9_]{1,15}"
                    maxLength={15}
                    autoFocus
                  />
                </Tooltip>
              </FormControl>
              <FormControl isRequired display={step === 2 ? 'block' : 'none'}>
                <FormLabel htmlFor="job-title" fontWeight={'normal'}>
                  What's your job title?
                </FormLabel>
                <Input
                  ref={jobTitleInput}
                  id="jobTitle"
                  value={userDetails.jobTitle || ''}
                  onChange={(e) => setUserDetails({ ...userDetails, jobTitle: e.target.value })}
                  onKeyUp={(e) => {
                    if (userDetails.jobTitle && userDetails.jobTitle.length > 0 && e.key === 'Enter') {
                      handleSubmit();
                    }
                  }}
                />
              </FormControl>
              <ButtonGroup mt="5%" w="100%">
                <Flex w="100%" justifyContent="space-between">
                  <Flex>
                    {step === 1 && (
                      <Button
                        w="7rem"
                        colorScheme="blue"
                        variant="outline"
                        onClick={() => navigateToJobTitle()}
                        isDisabled={!userDetails.username}
                      >
                        Next
                      </Button>
                    )}

                    {step === 2 && (
                      <Button w="7rem" colorScheme="blue" variant="outline" onClick={() => navigateToUsername()}>
                        Back
                      </Button>
                    )}
                  </Flex>
                  {step === 2 ? (
                    <Button
                      w="7rem"
                      colorScheme="blue"
                      variant="solid"
                      onClick={handleSubmit}
                      isDisabled={!userDetails.jobTitle}
                    >
                      Submit
                    </Button>
                  ) : null}
                </Flex>
              </ButtonGroup>
            </Box>
          </ModalBody>
          <Progress value={progress} hasStripe rounded="full" mt="2.5%" mb="5%" mx="4%" isAnimated />
        </ModalContent>
      </Modal>
    </>
  );
}
