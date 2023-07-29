'use client';

import Link from 'next/link';

import { Box, Center, GridItem, useColorModeValue, Heading, Text, Stack, Image } from '@chakra-ui/react';

export default function MovieCard({ title, tagline, rating, backdrop, homepage }: Movie.Movie) {
  return (
    <Center py={12}>
      <GridItem minW="max-content" minH="max-content">
        <Box
          role={'group'}
          p={6}
          maxW={'330px'}
          w={'full'}
          bg={useColorModeValue('white', 'gray.800')}
          boxShadow={'2xl'}
          rounded={'lg'}
          pos={'relative'}
          zIndex={1}
        >
          <Box
            rounded={'lg'}
            mt={-12}
            pos={'relative'}
            height={'230px'}
            _after={{
              transition: 'all .3s ease',
              content: '""',
              w: 'full',
              h: 'full',
              pos: 'absolute',
              top: 5,
              left: 0,
              backgroundImage: `url(${backdrop})`,
              filter: 'blur(15px)',
              zIndex: -1,
            }}
            _groupHover={{
              _after: {
                filter: 'blur(20px)',
              },
            }}
          >
            <Link href={homepage}>
              <Image rounded={'lg'} height={230} width={282} objectFit={'cover'} src={backdrop} alt="#" />
            </Link>
          </Box>
          <Stack pt={10} align={'center'}>
            <Text color={'gray.500'} fontSize={'sm'}>
              {tagline}
            </Text>
            <Link href={homepage}>
              <Heading fontSize={'2xl'} fontFamily={'body'} fontWeight={500}>
                {title}
              </Heading>
            </Link>
            <Stack direction={'row'} align={'center'}>
              <Text fontWeight={800} fontSize={'xl'}>
                {rating.toFixed(1)}
              </Text>
              <Text fontWeight={800} fontSize={'xl'}>
                / 10
              </Text>
            </Stack>
          </Stack>
        </Box>
      </GridItem>
    </Center>
  );
}
