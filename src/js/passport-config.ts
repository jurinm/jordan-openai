const express = require("express");
const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const app = express();

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: "http://localhost:3000",
      passReqToCallback: true, // Позволяет передавать объект запроса в колбэк
      accessType: "offline", // Указываем, что нам нужен refreshToken
      prompt: "consent", // Указываем, что мы всегда хотим получить refreshToken
    },
    (
      req: any,
      accessToken: any,
      refreshToken: any,
      profile: any,
      done: any,
    ) => {
      // Сохраняем токены доступа и обновления в пользовательской сессии

      // Тут вы можете обработать полученные токены и профиль пользователя
      // req.user содержит информацию о пользователе, если он уже аутентифицирован
      return done(null, { profile, accessToken, refreshToken });
    },
  ),
);

module.exports = passport;
