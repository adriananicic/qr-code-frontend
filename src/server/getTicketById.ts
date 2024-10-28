"use server";
import { getSession } from "@auth0/nextjs-auth0";

const getTicketByID = async (id: string) => {
  const session = await getSession();
  if (!session) return;
  const accessToken = session.accessToken;

  try {
    const res = await fetch(
      `https://qr-code-backend-426y.onrender.com/tickets/${id}`,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          Accept: "application/json",
        },
      }
    );

    if (!res.ok) {
      return null;
    }

    const data = await res.json();
    return data.data;
  } catch (error) {
    console.error("Error fetching ticket:", error);
    return null;
  }
};

export default getTicketByID;
