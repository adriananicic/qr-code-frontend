"use server";

import axios from "axios";
import fetchToken from "./fetchToken";

interface Props {
  vatin: string;
  firstName: string;
  lastName: string;
}

export const createTicket = async ({ firstName, lastName, vatin }: Props) => {
  try {
    const token = await fetchToken();

    console.log(token);

    const response = await axios.post(
      "https://qr-code-backend-426y.onrender.com/tickets/create",
      {
        firstName,
        lastName,
        vatin,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    );

    return response.data;
  } catch (error) {
    console.error("Error creating ticket:", error);
    return { success: false, message: (error as Error).message };
  }
};
