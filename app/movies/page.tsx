import { apollo } from '@apolloClient';
import { gql } from '@apollo/client';

import MovieGrid from '$MovieGrid';
import MoviesHeader from '$MoviesHeader';
import WelcomeModal from '$WelcomeModal';
import WelcomeProvider from '$WelcomeProvider';

export default async function Movies() {
  const { data } = await apollo().query({
    query: gql`
      query movies {
        trending(first: 16, timeWindow: Week) {
          edges {
            node {
              ... on Movie {
                title
                tagline
                rating
                backdrop(size: W780)
                homepage
              }
            }
          }
        }
      }
    `,
  });

  const movies: Movie.Movie[] = data.trending.edges.reduce((movieList: Movie.Movie[], movie: Movie.Node) => {
    const node = movie.node;

    if (node.title && node.tagline && node.rating && node.backdrop) {
      movieList.push({
        title: node.title,
        tagline: node.tagline,
        rating: node.rating,
        backdrop: node.backdrop,
        homepage: node.homepage,
      });
    }

    return movieList;
  }, []);

  return (
    <WelcomeProvider>
      <MoviesHeader />

      <MovieGrid movies={movies} />

      <WelcomeModal />
    </WelcomeProvider>
  );
}
