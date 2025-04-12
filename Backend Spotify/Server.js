// server.js
const express = require("express");
const axios = require("axios");
const cors = require("cors");
require("dotenv").config();

const app = express();
app.use(cors());
app.use(express.json());

app.post("/get-token", async (req, res) => {
  const code = req.body.code;
  try {
    const response = await axios.post("https://accounts.spotify.com/api/token", null, {
      params: {
        grant_type: "authorization_code",
        code,
        redirect_uri: process.env.REDIRECT_URI,
        client_id: process.env.CLIENT_ID,
        client_secret: process.env.CLIENT_SECRET
      },
      headers: {
        "Content-Type": "application/x-www-form-urlencoded"
      }
    });
    res.json(response.data);
  } catch (err) {
    console.error(err.response.data);
    res.status(400).json({ error: err.response.data });
  }
});

app.listen(3001, () => console.log("Backend running on http://localhost:3001"));
