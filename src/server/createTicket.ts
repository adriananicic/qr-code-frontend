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

    const response = await axios.post(
      "http://localhost:4000/tickets/create",
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
    throw new Error((error as Error).message || "An error occurred");
  }
};
