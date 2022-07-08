const dotenv = require("dotenv");
//import { Client } from "twitter-api-sdk";
const Client = require("twitter-api-sdk");

dotenv.config();
export const client = new Client(process.env.BEARER_TOKEN);
