'use client';

import { Container, SimpleGrid } from '@chakra-ui/react';

import MovieCard from '$MovieCard';

export default function MovieGrid({ movies }: { movies: Movie.Movie[] }) {
  return (
    <Container maxW="100%" px={{ base: 2, md: 36 }} alignSelf="center" alignItems="center" alignContent="center">
      <SimpleGrid minChildWidth="300px" spacing="12">
        {movies.map((movie: Movie.Movie) => (
          <MovieCard
            key={movie.title}
            title={movie.title}
            tagline={movie.tagline}
            rating={movie.rating}
            backdrop={movie.backdrop}
            homepage={movie.homepage}
          />
        ))}
      </SimpleGrid>
    </Container>
  );
}
