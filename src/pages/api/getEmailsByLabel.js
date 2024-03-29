import { google } from "googleapis";

export default async function handler(
  req,
  res
) {
  try {
    const auth = new google.auth.OAuth2({
      clientId:
        "",
      clientSecret: "",
      redirectUri: "",
    });

    // Установка учетных данных OAuth 2.0
    auth.setCredentials({
      access_token: req.query.access_token,
      refresh_token: req.query.refresh_token,
    });

    const gmail = google.gmail({ version: "v1", auth });

    // Получение писем из ярлыка
    const response = await gmail.users.messages.list({
      userId: "me",
      labelIds: ["family"], // Замените на ID вашего ярлыка
    });

    res.status(200).json(response.data);
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
}
