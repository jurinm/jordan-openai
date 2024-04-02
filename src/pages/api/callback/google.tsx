import { getSession } from 'next-auth/react';

export default function MyProtectedPage({ session }: any) {
  const { user, accessToken, refreshToken } = session;

  return (
    <div>
      <p>Welcome, {user.name}!</p>
      <p>Access Token: {accessToken}</p>
      <p>Refresh Token: {refreshToken}</p>
      success
    </div>
  );
}

export async function getServerSideProps(context: any) {
  const session = await getSession(context);
  // if (!session) {
  //   return {
  //     redirect: {
  //       destination: '/',
  //       permanent: false,
  //     },
  //   };
  // }
  return {
    props: {
      session,
    },
  };
}
