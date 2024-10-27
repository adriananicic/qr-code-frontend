"use client";
import { useEffect, useState } from "react";
import getTicketCount from "../server/getTIcketCount";
import TicketForm from "@/components/TicketForm";
import Link from "next/link";

export default function Home() {
  const [ticketCount, setTicketCount] = useState<number | undefined>();

  useEffect(() => {
    const ticketCountGet = async () => {
      const ticket = await getTicketCount();
      setTicketCount(ticket.data);
    };
    ticketCountGet();
  }, []);

  return (
    <div className="flex flex-col w-screen h-screen items-center gap-10 p-20 ">
      <p className="text-2xl">Tickets created: {JSON.stringify(ticketCount)}</p>
      <Link href="/api/auth/login">Log in</Link>
      <Link href="/api/auth/logout">Log out</Link>
      <TicketForm />
    </div>
  );
}
