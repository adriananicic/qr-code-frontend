"use server";
import { getSession } from "@auth0/nextjs-auth0";
import axios from "axios";

const getTickets = async () => {
  const session = await getSession();
  if (!session) return;
  const accessToken = session.accessToken;

  try {
    const res = await axios.get(
      "https://qr-code-backend-426y.onrender.com/tickets",
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          Accept: "application/json",
        },
      }
    );

    return res.data;
  } catch (error) {
    console.error("Error fetching tickets:", (error as Error).message);
    return { success: false, message: (error as Error).message };
  }
};

export default getTickets;
