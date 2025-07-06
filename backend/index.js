import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import connectDB from "./config/db.config.js";
import userAuthRoute from "./routes/userAuth.routes.js";
import userRoutes from "./routes/user.route.js";
import adminAuthRoute from "./routes/adminAuth.routes.js";
import userAuthmiddleware from "./middleware/userAuth.middleware.js";
import staticDataRoute from "./routes/staticData.route.js";
import { config } from "dotenv";
import axios from "axios";

config();

const app = express();
const PORT = process.env.PORT || 5000;

connectDB();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
  cors({
    origin: "*", 
  })
);
app.use(cookieParser());


app.use("/api/v1/user", userAuthRoute);
app.use("/api/v1/admin", adminAuthRoute);
app.use("/api/v1/user", userAuthmiddleware, userRoutes);
app.use("/api/v1/data", staticDataRoute);


app.post("/chat", async (req, res) => {
  const userMessage = req.body.message;

  const systemMessage = `
You are a helpful and friendly chatbot for a bike rental website.
- Booking steps: Choose location, select bike, confirm payment,accessories are optional.
- All kind of accessories are included .
- Users can cancel up to 2 hours before booking.
- There is fine for any bike damages
-  Best routes for biking in Sikkim:
  Gangtok to Nathula Pass, Gangtok to Yumthang Valley (via Lachung), Gangtok to Zuluk (via Silk Route), Ravangla – Namchi – Temi Tea Garden Loop, Pelling to Yuksom, Gurudongmar Lake (North Sikkim).

  Gangtok to Nathula Pass:
  Border ride with sharp bends and Himalayan views — a high-altitude adventure.

  Gangtok to Yumthang Valley (via Lachung):
  Lush forests, waterfalls, and the famous Valley of Flowers in North Sikkim.

  Gangtok to Zuluk (via Silk Route):
  A winding historic trade route with dramatic landscapes and 30+ hairpin turns.

  Ravangla – Namchi – Temi Tea Garden Loop:
  Scenic countryside ride through tea estates and peaceful hill towns.

  Pelling to Yuksom:
  Short heritage ride with monasteries and deep green valleys.

  Gurudongmar Lake:
  One of the highest-altitude rides in India (~17,800 ft) — recommended for expert riders only.

Answer clearly and concisely.
  `;

  try {
    const response = await axios.post(
      "https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent",
      {
        contents: [
          {
            role: "user",
            parts: [{ text: `${systemMessage}\n\n${userMessage}` }],
          },
        ],
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
        params: {
          key: process.env.GEMINI_API_KEY,
        },
      }
    );

    const reply =
      response.data.candidates?.[0]?.content?.parts?.[0]?.text ||
      "Sorry, I didn't get that.";

    res.json({ reply });
  } catch (error) {
    console.error("Gemini API error:", error.response?.data || error.message);
    res.status(500).json({ error: "Gemini API failed" });
  }
});

app.listen(PORT, () => {
  console.log(`✅ Server is running on port ${PORT}`);
});
