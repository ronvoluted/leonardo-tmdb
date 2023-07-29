namespace Auth {
  type SignUpError = 'email-exists' | 'username-exists';
  type SignUpSuccess = 'success';
  type SignUpSearchParam = `signup=${SignUpError | SignUpSuccess}`;

  type UserDetails = {
    id?: number;
    email?: string;
    username?: string | null;
    jobTitle?: string | null;
    currentUsername?: string | null;
    currentJobTitle?: string | null;
  };
}


namespace Movie {
  export type Node = {
    __typename: 'MovieOrTVOrPeopleEdge';
    node: {
      __typename: 'Movie';
      title: string;
      tagline: string;
      rating: number;
      backdrop: `http${string}`;
      homepage: `http${string}`;
    };
  };

  type Movie = Omit<MovieNode['node'], '__typename'>;
}
