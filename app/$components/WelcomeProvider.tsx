'use client';

import { createContext, useContext } from 'react';
import { useDisclosure } from '@chakra-ui/react';

import { UserContext } from '$UserProvider';

type WelcomeContextValue = {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
};

export const WelcomeContext = createContext<WelcomeContextValue>({} as WelcomeContextValue);

export default function WelcomeProvider({ children }: { children: React.ReactNode }) {
  const { userDetails, setUserDetails } = useContext(UserContext);

  const { isOpen, onOpen, onClose } = useDisclosure({
    onOpen: () => {
      setUserDetails({
        ...userDetails,
        currentUsername: userDetails.username,
        currentJobTitle: userDetails.jobTitle,
      });
    },
  });

  return <WelcomeContext.Provider value={{ isOpen, onOpen, onClose }}>{children}</WelcomeContext.Provider>;
}
