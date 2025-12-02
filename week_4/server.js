import express, { response } from "express";
import axios from "axios";
import cors from "cors";

import * as dotenv from "dotenv";
dotenv.config();

const app = express();
app.use(express.json());
app.use(cors());

const PORT = 3001; //
const GOOGLE_CLIENT_ID = process.env.GOOGLE_CLIENT_ID;
const GOOGLE_CLIENT_SECRET = process.env.GOOGLE_CLIENT_SECRET;

//const CLIENT_REDIRECT_URI = "http://localhost:3000";
const CLIENT_REDIRECT_URI = "http://localhost:3000/week_4";
const GOOGLE_TOKEN_URI = 'https://oauth2.googleapis.com/token'
const SERVER_REDIRECT_URI = 'http://localhost:' + PORT

app.get("/api/auth/url", (req, res) => {
  const authUrl =
    "https://accounts.google.com/o/oauth2/v2/auth?" +
    "client_id=" +
    GOOGLE_CLIENT_ID +
    "&" +
    "redirect_uri=" + CLIENT_REDIRECT_URI +
    "&" +
    "response_type=code&" +
    "scope=profile email&" +
    "access_type=offline&" +
    "prompt=consent";

  console.log(authUrl);

  res.json({ url: authUrl });
});

app.post('api/auth/token', async (req, res) => {
    const body = req.body
    const code = body.code

    // code != null 
    // code != ''
    if (!code)
    {
        return res.status(400).json({
            error: 'Please enter the code'
        })
    }

    // step 3: send code (key) to google server
    try {
        const tokenResponse = await axios.post(GOOGLE_TOKEN_URI, 
            {
                code,
                client_id: GOOGLE_CLIENT_ID,
                client_secret: GOOGLE_CLIENT_SECRET,
                redirect_uri: SERVER_REDIRECT_URI,
                grant_type: 'authorization_code'
            })
        console.log(tokenResponse);
            

    } catch (error){
        return res.status(500).json({
            error: 'Server failed to get google jwt key'
        })
    }
})

app.get("/", (req, res) => {
  console.log("Hello");
  res.send("Hello");
});

app.listen(PORT, () => {
  console.log(`SERVER is working http://localhost:${PORT}`);
  console.log(new Date());
});
