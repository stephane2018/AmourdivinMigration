//IMPORTS
import express from "express";
import router from "./routes/routes.js";
import sdk from "node-appwrite";
import cors from "cors";

const app = express();

//MIDDLEWARE TO TRANSFER DATA
app.use(express.urlencoded({ extended: true }));
app.use(express.json({ limit: "30mb", extended: true }));
app.use(cors());

//CONSTANTS
const PORT = 3001;

//MIDDLEWARES
app.use("/", router);

//CONNECTION WITH APPWRITE DATABASE

let client = new sdk.Client();
export const database = new sdk.Databases(client);
client
  .setEndpoint("http://78.46.11.35:89/v1") // Your API Endpoint
  .setProject("62628cb113431016278d") // Your project ID
  .setKey(
    "d9bdc892c3f9908d53d2a6a95136385b10336ecc00e6b97ccabebf704497f34f35211630a0a5563ac80a5ef69a936ac9500e93671d399fd87a012dc978bb8ce87bcc84615b189a7482bfc592cc347a258e7fefb7f0d15f70666652fbf616f544650d7040394608e7b2802231ec99b62d406dd767ca65d7aee58a651248c9e375"
  ); // Your secret API key

// LISTENING TO PORT
app.listen(PORT, () => {
  console.log(`Server Running on port ${PORT}`);
});
