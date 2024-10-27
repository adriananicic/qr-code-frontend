"use server";

const getTicketCount = async () => {
  try {
    const res = await fetch("http://localhost:4000/tickets/count");

    const count = await res.json();

    return count;
  } catch (error) {
    console.log("Fetch error:", error);

    return {
      success: false,
      message: "An error occurred: " + (error as Error).message,
    };
  }
};

export default getTicketCount;
