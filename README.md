# Leonardo.ai - TMDB Full Stack App

<img width="854" alt="leonardo-tmdb" src="https://github.com/ronvoluted/leonardo-tmdb/assets/5785323/b5670d7c-7d65-4343-9966-cd5c9d4b9df0">

## Deployment

**[leonardo-tmdb.vercel.app](https://leonardo-tmdb.vercel.app)**

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

## Implementation

### Authentication
Supabase hosts the PostgreSQL database, with Prisma managing it's schema/making queries. NextAuth (Auth.js) is used for authentication status and protected routes, with credentials password login enabled for both email and username. Passwords are secured as follows: `hash(password + pepper, salt)`

- The salt is a random 16-byte buffer stored next to the hashed password in the database, used to protect against rainbow table attacks
- The pepper is a random 16-char alphanumeric string stored as an environment variable/deployment secret, used to protect against dictionary attacks
- The hash is NodeJS' native `crypto.scrypt` implementation with the derived key stored as a 64-char string in the database, used to protect against brute-force attacks and plaintext vulnerabilities

### GraphQL

The choice of GraphQL API is an [unofficial wrapper around the TMDB API](https://github.com/nerdsupremacist/tmdb) (The Movie Database, an IMDB alternative). The first 16 trending movies are queried via Apollo Client then filtered if they don't have a tagline.

## Remarks

### Config
The Prettier, ESLint and TypeScript configs work for me but would naturally be replaced by agreed-upon choices in a team.

### @modules and $path aliases
Not common practice but something I wanted to try— the intent being to eliminate mental overhead of writing relative paths:

- `@prismaClient` instead of `app/@modules/prismaClient`
- `$Modal` instead of potentially `../../lib/components/Modal`

They're prefixed with `@` and `$` to always be at the top of the file tree instead of mixed in somewhere with other directories, though they may look a little unfamiliar. Components also have their own directory to save having to always expand `lib > components >` to access such a high-traffic folder.

### Flash of unstyled light mode
This is a known Chakra bug:

> In some cases, when you switch to dark mode and refresh the page, you might experience a quick flash of light mode before it switches correctly.
> This is a known issue and we're looking to fix it.
>
> https://chakra-ui.com/docs/styled-system/color-mode#color-mode-flash-issue

### "Extra attributes from the server" DevTools warning
```Warning: Extra attributes from the server: data-new-gr-c-s-check-loaded,data-gr-ext-installed```

Warnings like the above are caused by extensions such as Grammarly, Bitwarden and LastPass modifying the DOM, resulting in a mismatch duration hydration. Disabling the extension will remove this dev-only warning.

### Prisma migrations and `.env`
To avoid separately maintaining a `.env` for Prisma while maintaining a `.env.local` for Supabase and Auth.js (Vercel actually recommends `.env` be public/committed), `dotenv-cli` is used to load all variables from just `.env.local`. As a result, the commands for running a Prisma migration, seed, push, pull or execute are:

```bash
pnpm migrate
pnpm seed
pnpm push
pnpm pull
pnpm execute
```

[Prisma official recommendation](https://www.prisma.io/docs/guides/development-environment/environment-variables/using-multiple-env-files#running-migrations-on-different-environments)


### Commits
Normally commits would be more atomic but for blank projects the diffing is less useful, hence the larger commit changes.

### Possible improvements

- Changing/resetting password
- Changing email
- Filtering movies by genre or sorting by rating/date
- Constraints around job title (characters, length, etc)
- Indicators for some loading/submit states

