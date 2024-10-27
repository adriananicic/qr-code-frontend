const getTicketByID = async (id: string) => {
  try {
    const res = await fetch(`http://localhost:4000/tickets/${id}`, {
      cache: "no-store",
    });

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
