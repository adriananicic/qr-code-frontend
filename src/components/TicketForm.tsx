import { createTicket } from "@/server/createTicket";
import classNames from "classnames";
import React, { useState } from "react";

const TicketForm = () => {
  const [formData, setFormData] = useState({
    vatin: "",
    firstName: "",
    lastName: "",
  });
  const [qrCode, setQrCode] = useState("");
  const [ticketId, setTicketId] = useState("");
  const [message, setMessage] = useState("");
  const [messageColor, setMessageColor] = useState<"red" | "green">("green");

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    const response = await createTicket(formData);

    if (response.success) {
      setQrCode(response.qrCode);
      setTicketId(response.ticketId);
      setMessage("Successfully created a ticket");
      setMessageColor("green");
    } else {
      setMessage(response.message);
      setMessageColor("red");
    }
  };

  return (
    <div className="flex flex-col items-center h-full w-full bg-gray-100 p-4">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
        <h2 className="text-2xl font-semibold text-gray-800 mb-6 text-center">
          Create Ticket
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label
              className="block text-gray-700 font-medium mb-2"
              htmlFor="vatin"
            >
              VATIN
            </label>
            <input
              type="text"
              name="vatin"
              id="vatin"
              value={formData.vatin}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter VATIN"
            />
          </div>
          <div>
            <label
              className="block text-gray-700 font-medium mb-2"
              htmlFor="firstName"
            >
              First Name
            </label>
            <input
              type="text"
              name="firstName"
              id="firstName"
              value={formData.firstName}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter First Name"
            />
          </div>
          <div>
            <label
              className="block text-gray-700 font-medium mb-2"
              htmlFor="lastName"
            >
              Last Name
            </label>
            <input
              type="text"
              name="lastName"
              id="lastName"
              value={formData.lastName}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter Last Name"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-500 hover:bg-blue-600 text-white font-medium py-2 px-4 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            Create Ticket
          </button>
        </form>

        {message && (
          <p
            className={classNames(
              "mt-4 text-center ",
              messageColor == "red" ? "text-red-500" : "text-green-500"
            )}
          >
            {message}
          </p>
        )}

        {qrCode && (
          <div className="mt-8 text-center">
            <img src={qrCode} alt="QR Code" className="w-48 h-48 mx-auto" />
            {ticketId && (
              <p className="mt-4 text-gray-700">Ticket ID: {ticketId}</p>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default TicketForm;
