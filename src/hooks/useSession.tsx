import { signIn, signOut, useSession } from 'next-auth/client';

export default function MyComponent() {
  const [session, loading] = useSession();

  if (loading) return <div>Loading...</div>;

  return (
    <>
      {!session ? (
        <button onClick={() => signIn('google')}>Sign in with Google</button>
      ) : (
        <>
          <p>Signed in as {session.user.email}</p>
          <button onClick={() => signOut()}>Sign out</button>
        </>
      )}
    </>
  );
}
