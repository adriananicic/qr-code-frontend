"use client";
import { withPageAuthRequired } from "@auth0/nextjs-auth0/client";
import getTicketByID from "@/server/getTicketById";
import { useEffect, useState } from "react";
import Link from "next/link";

interface Ticket {
  vatin: string;
  firstName: string;
  lastName: string;
  createdAt: string;
}

interface TicketPageProps {
  params: { id: string };
}

export default withPageAuthRequired(function TicketPage({
  params,
}: TicketPageProps) {
  const { id } = params;
  const [ticket, setTicket] = useState<Ticket | null>(null);

  useEffect(() => {
    const getTicket = async () => {
      const ticket = await getTicketByID(id);
      setTicket(ticket);
    };
    getTicket();
  }, [id]);

  if (!ticket) {
    return <div>Invalid Ticket id</div>;
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 p-4">
      <Link href="/api/auth/logout">Log out</Link>
      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-bold mb-4">Ticket Details</h2>

        <p className="mb-2">
          <strong>OIB (VATIN):</strong> {ticket.vatin}
        </p>
        <p className="mb-2">
          <strong>First Name:</strong> {ticket.firstName}
        </p>
        <p className="mb-2">
          <strong>Last Name:</strong> {ticket.lastName}
        </p>
        <p className="mb-2">
          <strong>Created At:</strong>{" "}
          {new Date(ticket.createdAt).toLocaleString()}
        </p>
      </div>
    </div>
  );
});
