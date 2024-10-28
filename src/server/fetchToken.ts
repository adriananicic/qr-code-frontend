import axios from "axios";
import dotenv from "dotenv";

dotenv.config();

const fetchToken = async (): Promise<string> => {
  try {
    const response = await axios.post(
      `https://${process.env.AUTH0_DOMAIN}/oauth/token`,
      {
        client_id: process.env.AUTH0_CLIENT_ID_M2M,
        client_secret: process.env.AUTH0_CLIENT_SECRET_M2M,
        audience: process.env.AUTH0_AUDIENCE,
        grant_type: "client_credentials",
      },
      {
        headers: { "Content-Type": "application/json" },
      }
    );

    console.log("Authorized");

    return response.data.access_token;
  } catch (error) {
    console.error("Error fetching access token:", (error as Error).message);
    throw new Error("Could not retrieve access token");
  }
};

export default fetchToken;
