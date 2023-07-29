'use client';

import { createContext, useEffect, useState } from 'react';
import { useSession } from 'next-auth/react';

type UserContextValue = {
  refreshUserContext: () => void;
  updateSession: (data?: any) => Promise<unknown | null>;
  userDetails: Auth.UserDetails;
  setUserDetails: (userDetails: Auth.UserDetails) => void;
};

export const UserContext = createContext<UserContextValue>({} as UserContextValue);

export default function UserProvider({
  children,
  serverUser,
}: {
  children: React.ReactNode;
  serverUser?: Auth.UserDetails;
}) {
  const { update: updateSession } = useSession();

  const [userDetails, setUserDetails] = useState<Auth.UserDetails>({
    email: undefined,
    username: undefined,
    jobTitle: undefined,
    currentUsername: undefined,
    currentJobTitle: undefined,
    ...serverUser,
  });

  const refreshUserContext = () => {
    fetch('/api/user/')
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          setUserDetails({ ...userDetails, ...data.user });
        }
      })
      .catch((err) => {
        console.error(err);
      });
  };

  const context = {
    refreshUserContext,
    updateSession,
    userDetails,
    setUserDetails,
  };

  return <UserContext.Provider value={context}>{children}</UserContext.Provider>;
}
