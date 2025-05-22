import React, { useState, useEffect } from "react";

import Navbar from "../components/Navbar";
// import Footer from "../components/Footer"
import ShowTicket from "../components/ShowTicket";
import callApi from "../functions/functions";
import useSession from "../functions/auth";

import type { User } from "../types"
export default function Dashboard() {
  const [ticketId, setTicketId] = useState<number | null>(null);

  const [loading, setLoading] = useState<boolean>(false);
  const [user, setUser] = useState<User | null>(null);
  useEffect(() => {
    setLoading(true);

    // console.log("this occured");
    callApi("/getTickets", "GET", undefined).then((req) => {
      if (req.code == "ok") {
        let totalUser = useSession();
        console.log(JSON.parse(req.message).tickets);
        setUser({ ...totalUser, tickets: JSON.parse(req.message).tickets });
        setLoading(false);
      } else if (req.code === "err") {
        console.log("Something went wrong in gettickets request");
        setLoading(false);
      } else {
        console.log("Something went wrong in gettickets request   [else]");
      }
    });
  }, []);

 

  const openTicket = (i: number) => {
    setTicketId(i);
  };
  // id: event.id,
  // date: date,
  // type: cmod.decrypt(event.type),
  // startDate: startDate,
  // endDate: cmod.decrypt(event.endDate),
  // name: cmod.decrypt(event.name),

  return (
    <>
      <section className=" w-full h-full">
        {ticketId !== null && (
          <ShowTicket
          setShowTicket={setTicketId}
          ticketId={user?.tickets[ticketId ?? 0]?.ticketId}
        />
        )}
        <Navbar />

        {loading ? (
          <>
            <div className="relative h-[90vh] w-full">
              <div className="loading loading-spinner size-20 text-primary absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%]"></div>
            </div>
          </>
        ) : (
          <>
            <div className="sm:w-3/6 mx-auto p-4">
              <div className="flex font-1 sm:flex-row flex-col sm:text-left text-center sm:gap-0 gap-4 justify-between items-center">
                <p className=" font-bold text-4xl">My tickets</p>

                <p className="text-sm">
                  Currently Logged in as{" "}
                  <span className="font-bold">{user?.email}</span>
                </p>
              </div>

              <div className="mt-10 rounded-box bg-base-200 flex sm:flex-row flex-col flex-wrap gap-4 w-full mx-auto p-0">
                {user&&user?.tickets.length > 0 ? (
                  <>
                    {user.tickets.map(
                      (ticket, i) =>
                        ticket.isActive && (
                          <div
                            key={i}
                            onClick={(e) => {
                              openTicket(i);
                            }}
                            className="sm:grid flex flex-col gap-2 cursor-pointer w-full select-none grid-cols-8 p-2 border sm:min-w-96 min-h-52 rounded-box border-dashed"
                          >
                            <div className="sm:border-r-4 border-primary  border-dashed relative">
                              <div className="p-4 rounded-full absolute left-[-30px] bg-base-100 top-[50%] translate-y-[-50%] border-r-2 border-dashed"></div>
                              <div className="sm:rotate-[270deg] font-1 font-semibold text-left text-lg sm:absolute sm:top-[50%] sm:left-[50%] sm:translate-x-[-50%] sm:translate-y-[-50%] text-nowrap">
                                <p>{ticket.type}</p>
                              </div>
                            </div>
                            <div className=" sm:col-span-7">
                              <p className="font-2">{ticket.school}</p>
                              <p className="font-1 font-bold">{ticket.name}</p>

                              <p>
                                {new Date(Number(ticket.startDate))
                                  .toLocaleString("en-US", {
                                    weekday: "short",
                                    month: "long",
                                    day: "numeric",
                                    year: "numeric",
                                    hour: "numeric",
                                    hour12: true,
                                  })
                                  .replace(/, /, " at ")
                                  .replace(" AM", "am")
                                  .replace(" PM", "pm")}
                              </p>
                              <button className="btn font-bold font-1 btn-primary mt-2">
                                <p>View Ticket</p>
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  viewBox="0 0 24 24"
                                  fill="currentColor"
                                  className="size-6"
                                >
                                  <path
                                    fillRule="evenodd"
                                    d="M1.5 6.375c0-1.036.84-1.875 1.875-1.875h17.25c1.035 0 1.875.84 1.875 1.875v3.026a.75.75 0 0 1-.375.65 2.249 2.249 0 0 0 0 3.898.75.75 0 0 1 .375.65v3.026c0 1.035-.84 1.875-1.875 1.875H3.375A1.875 1.875 0 0 1 1.5 17.625v-3.026a.75.75 0 0 1 .374-.65 2.249 2.249 0 0 0 0-3.898.75.75 0 0 1-.374-.65V6.375Zm15-1.125a.75.75 0 0 1 .75.75v.75a.75.75 0 0 1-1.5 0V6a.75.75 0 0 1 .75-.75Zm.75 4.5a.75.75 0 0 0-1.5 0v.75a.75.75 0 0 0 1.5 0v-.75Zm-.75 3a.75.75 0 0 1 .75.75v.75a.75.75 0 0 1-1.5 0v-.75a.75.75 0 0 1 .75-.75Zm.75 4.5a.75.75 0 0 0-1.5 0V18a.75.75 0 0 0 1.5 0v-.75ZM6 12a.75.75 0 0 1 .75-.75H12a.75.75 0 0 1 0 1.5H6.75A.75.75 0 0 1 6 12Zm.75 2.25a.75.75 0 0 0 0 1.5h3a.75.75 0 0 0 0-1.5h-3Z"
                                    clipRule="evenodd"
                                  />
                                </svg>
                              </button>
                            </div>
                          </div>
                        )
                    )}
                    {user.tickets.some((ticket) => ticket.isActive) ===
                      false && (
                      <div className="p-4">
                        <p className="font-1 font-bold">No Tickets</p>
                      </div>
                    )}
                  </>
                ) : (
                  <>
                    <div className="p-4">
                      <p className="font-1 font-bold">No Active Tickets</p>
                    </div>
                  </>
                )}
              </div>

              <div className="divider"></div>
              <div className="bg-base-200  mt-5 p-3 rounded-box">
                <p className="font-1">Previous Tickets</p>
              </div>
              <div className="rounded-box bg-base-200 flex mt-5 flex-col flex-wrap gap-4 w-full mx-auto p-0">
                {user&&user.tickets.length > 0 ? (
                  <>
                    {user.tickets.map(
                      (ticket, i) =>
                        !ticket.isActive && (
                          <div
                            key={i}
                            className=" flex  font-1 flex-col gap-1 cursor-pointer w-full select-none p-2 border sm:min-w-96 rounded-box border-dashed"
                          >
                            <div className="flex flex-row gap-2 items-center">
                              <div className="badge badge-error badge-outline">
                                <p className=" font-1">Inactive</p>
                              </div>
                              <div className="badge badge-accent">
                                <p className="font-1">{ticket.type}</p>
                              </div>
                            </div>

                            <p className="font-1 font-bold text-lg">
                              {ticket.name}
                            </p>

                            <p className="text-sm">
                              {new Date(Number(ticket.startDate))
                                .toLocaleString("en-US", {
                                  weekday: "short",
                                  month: "long",
                                  day: "numeric",
                                  year: "numeric",
                                  hour: "numeric",
                                  hour12: true,
                                })
                                .replace(/, /, " at ")
                                .replace(" AM", "am")
                                .replace(" PM", "pm")}
                            </p>
                            <p className="">
                              This ticket is a "{ticket.type}" type of ticket
                            </p>
                          </div>
                        )
                    )}
                  </>
                ) : (
                  <></>
                )}
              </div>
            </div>
          </>
        )}
      </section>
    </>
  );
}
