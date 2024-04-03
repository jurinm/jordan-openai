import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import { google } from 'googleapis';

const GOOGLE_AUTHORIZATION_URL =
  "https://accounts.google.com/o/oauth2/v2/auth?" +
  new URLSearchParams({
    prompt: "consent",
    access_type: "offline",
    response_type: "code",
  });


async function getLatestGmailMessages(accessToken) {
  console.log('Получение сообщений из Gmail...');
  const gmail = google.gmail({
    version: 'v1',
    auth: accessToken,
  });

  try {
    // Отправляем запрос на получение списка сообщений
    const response = await gmail.users.messages.list({
      userId: 'me', // 'me' указывает на текущего пользователя
      maxResults: 10, // Максимальное количество сообщений для получения
    });

    // Обработка ответа и сохранение информации в локальном хранилище
    const messages = response.data.messages;
    // Сохраняем сообщения в локальном хранилище или выполняем другие нужные действия
    console.log('Последние сообщения:', messages);
    // Здесь можно сохранить сообщения в локальном хранилище вашего приложения
  } catch (error) {
    console.error('Ошибка при получении сообщений из Gmail:', error);
  }
}


async function refreshAccessToken(token) {
  try {
    console.log("111111");

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

    const updatedToken = {
      ...token,
      accessToken: refreshedTokens.access_token,
      accessTokenExpires: Date.now() + refreshedTokens.expires_in * 1000,
      refreshToken: refreshedTokens.refresh_token ?? token.refreshToken, // Fall back to old refresh token
    };

    // После успешного обновления токена доступа отправляем запрос на получение сообщений
    await getLatestGmailMessages(updatedToken.accessToken);

    return updatedToken;
  } catch (error) {
    console.log("error22222", error);

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
      console.log("eeeeeeee")
      console.log({ ...token })

      if (account?.accessToken) {
        console.log("qqqqqqq")
        token.accessToken = account.accessToken;
        token.accessTokenExpires = Date.now() + account.expires_in * 1000;
        token.refreshToken = account.refresh_token;
        token.user = user;
      } else if (token?.accessTokenExpires && Date.now() > token.accessTokenExpires) {
        console.log("23232323232")
        // Access token has expired, try to update it
        return refreshAccessToken(token);
      } else {
        console.log("444444")

      }

      return token;
    },
    async session({ session, user, token }) {
      return ({ ...session, ...user, ...token })
    },
  },
});