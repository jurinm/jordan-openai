import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";

const GOOGLE_AUTHORIZATION_URL =
  "https://accounts.google.com/o/oauth2/v2/auth?" +
  new URLSearchParams({
    prompt: "consent",
    access_type: "offline",
    response_type: "code",
    scope: "https://www.googleapis.com/auth/drive.metadata.readonly",
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

      authorization: {
        params: {
          prompt: "consent",
          access_type: "offline",
          response_type: "code",
          scope:
            "https://mail.google.com/ https://www.google.com/m8/feeds https://www.googleapis.com/auth/userinfo.email https://www.googleapis.com/auth/userinfo.profile openid",
        },
      },
    }),
  ],
  session: {
    strategy: "jwt",
    maxAge: 60 * 60 * 24 * 30,
  },
  callbacks: {
    async jwt({ token, user, account, profile, isNewUser }) {
      // Initial sign in

      if (Date.now() < token?.accessTokenExpires) {
        return token;
      }
      if (account && user) {
        return {
          accessToken: account.accessToken,
          accessTokenExpires: account.expires_at + 30000,
          refreshToken: account.refresh_token,
          user,
        };
      } else if (
        token?.accessTokenExpires &&
        Date.now() > token.accessTokenExpires
      ) {
        // Access token has expired, try to update it
        return refreshAccessToken(token);
      }

      return token;
    },
    async session(session, token) {
      if (token) {
        session.accessToken = token.accessToken;
        session.session.user.email = "token.user.email";
        session.session.user.name = token.user.name;
        session.session.user.image = token.user.image;
      }

      return session;
    },
  },
});
