import { ApolloClient, HttpLink, InMemoryCache } from '@apollo/client';
import { NextSSRInMemoryCache, NextSSRApolloClient } from '@apollo/experimental-nextjs-app-support/ssr';
import { registerApolloClient } from '@apollo/experimental-nextjs-app-support/rsc';

export const { getClient: apollo } = registerApolloClient(() => {
  return new NextSSRApolloClient({
    cache: new NextSSRInMemoryCache(),
    link: new HttpLink({ uri: 'https://tmdb.apps.quintero.io' }),
  });
});
