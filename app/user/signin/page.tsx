import SignInForm from '$SignInForm';

export default async function SignIn({ searchParams }: { searchParams: Record<string, string | string[]> }) {
  const appUrl =
    process.env.NODE_ENV === 'production' && typeof process.env.NEXT_PUBLIC_URL === 'string'
      ? process.env.NEXT_PUBLIC_URL
      : 'http://localhost:3000';

  return <SignInForm appUrl={appUrl} searchParams={searchParams} />;
}
