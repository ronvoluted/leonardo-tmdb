# Leonardo.ai - TMDB Full Stack App

**Movies for the authenticated filmgoer**

![]()

## Deployment

[https:/leonardo-tmdb.vercel.app](https:/leonardo-tmdb.vercel.app)

## Running locally

```bash
# PNPM
pnpm i && pnpm dev
```

```bash
# NPM
npm i && npm run dev
```

[http://localhost:3000](http://localhost:3000)

## Architecture

### Authentication
Supabase hosts the PostgreSQL database, with Prisma managing/querying its schema.

Passwords are secured as follows:
```
hash(password + pepper, salt)
```
The salt is a random 16-byte buffer stored next to the hashed password in the database. It helps protect against rainbow table attacks.

The pepper is a random 16-char alphanumeric string stored as an environment variable/deployment secret. It helps protect against dictionary attacks.

The hash is NodeJS' native `crypto.scrypt` implementation stored as a 64-char string in the database.  It helps protect against brute-force attacks.

NextAuth (Auth.js) is used for reactive auth UI, session data and protected routes.

### GraphQL

The choice of GraphQL API is an [unofficial wrapper around the TMDB API](https://github.com/nerdsupremacist/tmdb) (The Movie Database, an IMDB alternative). The first 16 trending movies are queried via Apollo Client, filtered if they don't have a tagline, then optionally filtered in UI based on genre tags.

## Remarks

### `prisma` as non-dev dependency
> Some platforms like Vercel, prune development dependencies during the build, thereby preventing you from calling the command. This can be worked around by making the prisma a production dependency, by moving it to dependencies in your package.json
>
>[https://www.prisma.io/docs/guides/deployment/deploy-database-changes-with-prisma-migrate](https://www.prisma.io/docs/guides/deployment/deploy-database-changes-with-prisma-migrate#:~:text=some%20platforms%20like%20vercel)

### Config
The Prettier, ESLint and TypeScript configs work for me but would naturally be replaced by agreed-upon choices in a team.


### @modules and $path aliases
Not common practice but something I wanted to try— the intent being to eliminate mental overhead of writing relative paths:

- `@utility/randArray` instead of `app/@modules/utility/randArray`
- `$Modal` instead of potentially `../../lib/components/Modal`

Components are also in their own directory to save having to always expand `lib > components >` to access such a high-traffic folder. They're prefixed with `@` and `$` to always be at the top of the file tree instead of mixed in somewhere with other directories, though they do look a little odd.

### Flash of unstyled light mode
This is a known Chakra bug:

> In some cases, when you switch to dark mode and refresh the page, you might experience a quick flash of light mode before it switches correctly.
> This is a known issue and we're looking to fix it.
>
> https://chakra-ui.com/docs/styled-system/color-mode#color-mode-flash-issue

