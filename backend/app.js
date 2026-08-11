import dotenv from "dotenv";
dotenv.config();
import express from "express";
import mongoose from "mongoose";
import { config, uploader } from "cloudinary";
import openai from "openai";

const app = express();
const PORT = 9000;


//!Connect to mongodb
mongoose.connect(process.env.MONGO_URL).then(() => {
  console.log("Mongodb connected")
}).catch(e => console.log(e))
//!Configure openai
const openaiClient = new openai({ apiKey: process.env.OPENAI_KEY });
//!Configure cloudinary
config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
  secure: true,
});
//!Middlewares
app.use(express.json());

//!Route
app.post("/generate-image", async (req, res) => {
  const { prompt } = req.body;
  try {
    const imageResponse = await openaiClient.images.generate({
      model: "gpt-image-1",
      prompt,
      n: 1,
      size: "1024x1024",
      quality: "low"
    });
    const imageBase64 = imageResponse.data[0].b64_json;
    //Save the image into cloudinary
    const dataUri = `data:image/png;base64,${imageBase64}`;
    const image = await uploader.upload(dataUri, { folder: "ai-artwork" });
    console.log(image);
    res.json(`data:image/png;base64,${imageBase64}`);
  } catch (error) {
    res.json({ message: "Error generating image", error: error.message });
  }
});

//!Start the sever
app.listen(PORT, console.log("Server is running..."));
