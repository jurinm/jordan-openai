import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";

const GOOGLE_AUTHORIZATION_URL =
  "https://accounts.google.com/o/oauth2/v2/auth?" +
  new URLSearchParams({
    prompt: "consent",
    access_type: "offline",
    response_type: "code",
  });

async function refreshAccessToken(token) {
  try {
    const url =
      "https://oauth2.googleapis.com/token?" +
      new URLSearchParams({
        client_id: process.env.GOOGLE_CLIENT_ID,
        client_secret: process.env.GOOGLE_CLIENT_SECRET,
        grant_type: "refresh_token",
        refresh_token: token.refreshToken,
      });

    const response = await fetch(url, {
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      method: "POST",
    });

    const refreshedTokens = await response.json();

    if (!response.ok) {
      throw refreshedTokens;
    }

    return {
      ...token,
      accessToken: refreshedTokens.access_token,
      accessTokenExpires: Date.now() + refreshedTokens.expires_in * 1000,
      refreshToken: refreshedTokens.refresh_token ?? token.refreshToken, // Fall back to old refresh token
    };
  } catch (error) {
    console.log(error);

    return {
      ...token,
      error: "RefreshAccessTokenError",
    };
  }
}


export default NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      authorizationUrl: GOOGLE_AUTHORIZATION_URL,
    }),
  ],
  callbacks: {
    async jwt(token, user, account, profile, isNewUser) {
      // Initial sign in
      if (account?.accessToken) {
        token.accessToken = account.accessToken;
        token.accessTokenExpires = Date.now() + account.expires_in * 1000;
        token.refreshToken = account.refresh_token;
        token.user = user;
      } else if (token?.accessTokenExpires && Date.now() > token.accessTokenExpires) {
        // Access token has expired, try to update it
        return refreshAccessToken(token);
      }

      return token;
    },
    async session(session, token) {
      if (token) {
        session = {
          ...session,
          token11: token,
        }
      }

      return session;
    },
  },
});