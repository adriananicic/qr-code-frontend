import { getSession } from "@auth0/nextjs-auth0";
import axios from "axios";

const getTickets = async () => {
  const session = await getSession();
  try {
    const res = await axios.get("http://localhost:4000/tickets", {
      headers: {
        Authorization: `Bearer ${session?.accessToken}`,
        Accept: "application/json",
      },
    });

    return res.data;
  } catch (error) {
    console.error("Error fetching tickets:", (error as Error).message);
    return { success: false, message: (error as Error).message };
  }
};

export default getTickets;
