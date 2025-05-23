import React, { useState, useEffect } from "react";
import callApi from "../functions/functions";
import Notif from "./Notif";
import type { Event, NotifType, DashboardTicket, ResType } from "../types"

let timeout: ReturnType<typeof setTimeout>;




export default function EventDashboard(props: any) {
  const [allTickets, setAllTickets] = useState<DashboardTicket[] | []>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [notif, setNotif] = useState<NotifType>({
    type: "err",
    message: "",
  });
  const [eventDetails, setEventDetails] = useState<Event | undefined>();
  useEffect(() => {
    console.log(props.event);

    setLoading(true);

    callApi("/getEventStats", "POST", { eventId: props.event.id }).then(
      (res: ResType) => {
        if (res.code === "err") {
          setLoading(false);
          // could put an error here
          console.log("something went wrong...");
        } else if (res.code === "ok") {
          setAllTickets(JSON.parse(res.message));
          setLoading(false);
          setEventDetails(props.event);
        } else {
          window.location.replace("/login");
        }
      }
    );
    return () => {
      setAllTickets([]);
    };

    // setAllTickets([
    //     {
    //         name: 'Sebastian',
    //         amountPaid: 19.44,
    //         email: "maracucho@gmail.com",

    //     },
    //     {
    //         name: 'Sebastian',
    //         amountPaid: 19.44,
    //         email: "maracucho@gmail.com",

    //     },

    //     {
    //         name: 'Sebastian',
    //         amountPaid: 19.44,
    //         email: "maracucho@gmail.com",

    //     },

    // ])
  }, [props.event]);
  useEffect(() => {
    timeout = setTimeout(() => {
      setNotif({ type: "err", message: "" });
    }, 5000);

    return () => {
      clearTimeout(timeout);
    };
  }, [notif]);

  const changeDetails = () => {
    if (eventDetails) {
        callApi("/updateEvent", "POST", {
            id: eventDetails["id"],
            event: eventDetails,
          }).then((res: ResType) => {
            if (res.code === "err") {
              setNotif({ type: "err", message: "Invalid event update" });
            } else if (res.code === "ok") {
              setNotif({ type: "success", message: "Successfully updated" });
            }
          });
    }
   
  };

  const handleDownload = async () => {
    try {
      const endpoint = import.meta.env.VITE_BACKEND_URL || "https://api.ticketnest.us";
      
      const response = await fetch(endpoint + "/exportData", {
        method: "POST",
        mode: "cors",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ exportId: eventDetails.id }),
      });

      if (!response.ok) {
        throw new Error("Download failed");
      }

      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = "export.csv";
      document.body.appendChild(a);
      a.click();
      a.remove();
      window.URL.revokeObjectURL(url);
    } catch (err) {
      console.error(err);
      alert("Error Getting file");
    }
  };

  return (
    <>
      <div className=" font-1 w-full">
        <div className="bg-base-300  items-center  gap-4 p-2 mb-2 rounded-box flex flex-row">
          <button
            onClick={() => {
              props.setSelectedEvent(null);
            }}
            className="btn btn-ghost"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              className="size-6"
            >
              <path
                fillRule="evenodd"
                d="M11.03 3.97a.75.75 0 0 1 0 1.06l-6.22 6.22H21a.75.75 0 0 1 0 1.5H4.81l6.22 6.22a.75.75 0 1 1-1.06 1.06l-7.5-7.5a.75.75 0 0 1 0-1.06l7.5-7.5a.75.75 0 0 1 1.06 0Z"
                clipRule="evenodd"
              />
            </svg>
            Go back
          </button>
          <p>
            Viewing Tickets for{" "}
            <span className="font-bold">{props.event.name}</span>
          </p>
        </div>

        {notif.message !== "" && (
          <Notif type={notif.type} message={notif.message} />
        )}
        <div className=" my-3 p-3 w-full bg-base-200 rounded-box">
          <p className="font-bold">Change Event Details</p>
          <div className="flex flex-row w-full items-start gap-2 ">
            <fieldset className="fieldset">
              <legend className="fieldset-legend">Event Name</legend>
              <input
                className="input input-sm"
                placeholder="Name"
                value={eventDetails?.name}
                onChange={(e) => {

                    if (e.target.value) {
                        setEventDetails((prevDetails) =>
                          prevDetails
                            ? { ...prevDetails, name: e.target.value }
                            : prevDetails
                        );
                    }
                  
                }}
              />
            </fieldset>

            <fieldset className="fieldset w-full flex-1">
              <legend className="fieldset-legend">Event Description</legend>
              <textarea
                value={eventDetails?.description}
                name="thing"
                className="textarea textarea-sm"
                onChange={(e) => {
                  setEventDetails((prevDetails) =>
                    prevDetails
                      ? { ...prevDetails, description: e.target.value }
                      : prevDetails
                  );
                }}
              ></textarea>
            </fieldset>

            <fieldset className="fieldset w-full flex-1">
              <legend className="fieldset-legend">Event Visibility</legend>
              <input
                type="checkbox"
                className="toggle toggle-primary"
                checked={eventDetails?.isActive}
                onClick={() => {
                  setEventDetails((prev) =>
                    prev ? { ...prev, isActive: !prev.isActive } : prev
                  );
                }}
              />
            </fieldset>
          </div>

          <button className="btn btn-primary btn-sm" onClick={changeDetails}>
            Change Details
          </button>
        </div>

        <div className="mt-2 flex flex-row gap-2">
          <div className="btn btn-sm btn-neutral" onClick={handleDownload}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              className="size-4"
            >
              <path
                fillRule="evenodd"
                d="M12 2.25a.75.75 0 0 1 .75.75v11.69l3.22-3.22a.75.75 0 1 1 1.06 1.06l-4.5 4.5a.75.75 0 0 1-1.06 0l-4.5-4.5a.75.75 0 1 1 1.06-1.06l3.22 3.22V3a.75.75 0 0 1 .75-.75Zm-9 13.5a.75.75 0 0 1 .75.75v2.25a1.5 1.5 0 0 0 1.5 1.5h13.5a1.5 1.5 0 0 0 1.5-1.5V16.5a.75.75 0 0 1 1.5 0v2.25a3 3 0 0 1-3 3H5.25a3 3 0 0 1-3-3V16.5a.75.75 0 0 1 .75-.75Z"
                clipRule="evenodd"
              />
            </svg>
            Export Data
          </div>
        </div>
        <table className="table table-zebra">
          {/* head */}
          <thead>
            <tr className="text-center">
              <th></th>
              <th>Name</th>
              <th>Email</th>
              <th>Amount Spent</th>
            </tr>
          </thead>
          <tbody>
            {/* row 1 */}
            {loading ? (
              <>
                {Array(5)
                  .fill(" ")
                  .map((_, i) => (
                    <tr key={i}>
                      <td colSpan={4}>
                        <div
                          className={`skeleton h-10 w-full ${
                            i % 2 === 0 ? "bg-base-300" : "bg-neutral"
                          }`}
                        />
                      </td>
                    </tr>
                  ))}
              </>
            ) : (
              <>
                {allTickets && allTickets.length === 0 && (
                  <tr>
                    <td colSpan={4}>
                      <div className="bg-base-300 rounded-box p-3 min-h-[20vh] py-10">
                        <div className="font-1 font-bold text-lg">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 24 24"
                            fill="currentColor"
                            className="size-12 mx-auto"
                          >
                            <path
                              fillRule="evenodd"
                              d="M6.75 2.25A.75.75 0 0 1 7.5 3v1.5h9V3A.75.75 0 0 1 18 3v1.5h.75a3 3 0 0 1 3 3v11.25a3 3 0 0 1-3 3H5.25a3 3 0 0 1-3-3V7.5a3 3 0 0 1 3-3H6V3a.75.75 0 0 1 .75-.75Zm13.5 9a1.5 1.5 0 0 0-1.5-1.5H5.25a1.5 1.5 0 0 0-1.5 1.5v7.5a1.5 1.5 0 0 0 1.5 1.5h13.5a1.5 1.5 0 0 0 1.5-1.5v-7.5Z"
                              clipRule="evenodd"
                            />
                          </svg>

                          <p className="text-center">No tickets purchased</p>
                          <div className="w-fit mx-auto mt-3"></div>
                        </div>
                      </div>
                    </td>
                  </tr>
                )}

                {allTickets.map((ticket, i) => (
                  <tr key={i} className="font-1 text-center">
                    <th>
                      <input className="checkbox" type="checkbox" />
                    </th>
                    <td className="link hover:text-blue-500">{ticket.name}</td>
                    <td>{ticket.email}</td>
                    <td>{ticket.amountPaid}</td>
                  </tr>
                ))}
              </>
            )}

            {/* row 2 */}
          </tbody>
        </table>
      </div>
    </>
  );
}
