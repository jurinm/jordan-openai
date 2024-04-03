import { google } from "googleapis";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  try {
    const auth = new google.auth.OAuth2({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      redirectUri: "localhost:3000",
    });

    // Установка учетных данных OAuth 2.0
    if (
      typeof req.query.access_token === "string" &&
      typeof req.query.refresh_token === "string"
    ) {
      auth.setCredentials({
        access_token: req.query.access_token,
        refresh_token: req.query.refresh_token,
      });
    } else {
      // Обработка случаев, когда параметры access_token и refresh_token не являются строками
    }

    const gmail = google.gmail({ version: "v1", auth });

    const response = await gmail.users.messages.list({
      userId: "me",
      labelIds: ["family"],
    });

    res.status(200).json(response.data);
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
}
