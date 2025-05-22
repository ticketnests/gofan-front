import { useEffect, useState } from "react";
import EventDashboard from "./EventDashboard";
// import "cally";
import Notif from "./Notif";
import callApi, { formatString, isString } from "../functions/functions";
import {
  CalendarDaysIcon,
  ArrowLeftCircleIcon,
  ArrowTopRightOnSquareIcon,
  CurrencyDollarIcon,
  BookOpenIcon,
  TicketIcon,
  TrashIcon,
  InformationCircleIcon,
  MagnifyingGlassIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline";


import type {Timeout, CreateEvent, Event} from "../types"

let timeout: Timeout;
export default function TicketDashboard() {
  const weekDays = ["Sun", "Mon", "Tue", "Wed", "Thur", "Fri", "Sat"];
  const months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];
//   const [user, setUser] = useState();
  const [loading, setLoading] = useState(false);
  const [quickNav, setQuickNav] = useState("dashboard");
  const [selectedEvent, setSelectedEvent] = useState<number | null>(null);
  const [events, setEvents] = useState<Event[] | []>([]);
  const [searchedEvents, setSearchedEvents] = useState<Event[] | []>([]);
  // const [craftedEvent, setCraftedEvent] = useState({
  //   type: "Ticket",
  // })

  const [currentTicket, setCurrentTicket] = useState({
    price: 0,
    name: "",
  });

  const [newEvents, setNewEvents] = useState<CreateEvent>({
    type: "Athletic",
    // sport: "Basketball",
    startDate: 0,
    endDate: 0,
    options: [],
    isActive: true,
    description: "",
    name: ""
  });

//   const [totalOpponents, setTotalOpponents] = useState(null);

  const [notif, setNotif] = useState({
    type: "err",
    message: "",
  });

  useEffect(() => {
    timeout = setTimeout(() => {
      setNotif({ type: "err", message: "" });
    }, 5000);

    return () => {
      clearTimeout(timeout);
    };
  }, [notif]);

  const createEvent = () => {
    console.log("this was clicked");
    const validOptions: string[] = ["theater", "athletic", "other"];

    if (
      Date.now() > newEvents.startDate &&
      newEvents.startDate < newEvents.endDate
    ) {
      setNotif({ type: "err", message: "Invalid Date" });
    } else if (
      !String(newEvents.type.toLowerCase() === "theater") &&
      !String(newEvents.type.toLowerCase() === "athletic") &&
      !String(newEvents.type.toLowerCase() === "other")
    ) {
      console.log(newEvents.type.toLowerCase() === "theater");
      setNotif({ type: "err", message: "Enter a valid event type" });
    } else if (
      newEvents.name &&
      !isString(newEvents.name, 1000) &&
      !(newEvents.name.length > 0)
    ) {
      console.log(Boolean(newEvents.name));
      console.log(isString(newEvents.name, 1000));
      console.log(newEvents.name.length > 0);
      setNotif({ type: "err", message: "Enter a name" });
    } else if (newEvents.options && !(newEvents.options.length > 0)) {
      setNotif({ type: "err", message: "Enter at least one ticket" });
    } else if (
      (newEvents.description) &&
      (newEvents.description.length > 0) &&
      !isString(newEvents.description, 1000)
    ) {
      setNotif({ type: "err", message: "Enter a description" });
    } else {
      console.log(newEvents);
      callApi("/createEvent", "POST", newEvents).then((res) => {
        if (res.code === "err") {
          setNotif({ type: "err", message: "Invalid request" });
        } else if (res.code === "ok") {
          setNotif({ type: "success", message: "Created Event Success" });
          setNewEvents({
            type: "Athletic",
            // sport: "Basketball",
            startDate: 0,
            endDate: 0,
            options: [],
            isActive: true,
            name: "",
            description: "",
          });
        } else {
          setNotif({ type: "err", message: "Invalid request" });
        }
      });
    }
  };

  useEffect(() => {
    // const sessionStorageUser = sessionStorage.getItem("user");
    setLoading(true);

    // if (sessionStorageUser) {
    // //   setUser(JSON.parse(sessionStorageUser));
    // //   setTotalOpponents([
    // //     {
    // //       schoolId: JSON.parse(sessionStorageUser).uuid,
    // //       name: JSON.parse(sessionStorageUser).name,
    // //     },
    // //   ]);
    // }

    callApi("/getDashboardAdmin", "GET",null).then((res) => {
      if (res.code === "err") {
        setLoading(false);
        window.location.replace("/");
      } else {
        setLoading(false);
        setEvents(JSON.parse(res.message));
      }
    });
  }, []);

  function timeToMilliseconds(timeStr: string) {
    const [hours, minutes] = timeStr.split(":").map(Number);
    return (hours * 60 + minutes) * 60 * 1000;
  }

  return (
    <>
      {/* Modified layout structure with xl breakpoint changes */}
      <div className="mt-2 flex flex-col xl:flex-row gap-2">
        {/* Left column on xl - contains both Select Events and Quick Start stacked vertically */}
        <div className="flex flex-col md:flex-row xl:flex-col xl:w-1/3 gap-2">
          {/* Select Events - full width on mobile, left side on md, top on xl */}
          <div className="md:flex-1 xl:w-full p-4 rounded-box border-2 dark:border-gray-700 shadow-sm">
            <h3 className="font-1 font-semibold text-lg mb-3">Select Events</h3>

            <div className="relative">
              <label className="input input-bordered flex items-center gap-2 w-full">
                <MagnifyingGlassIcon className="size-5 opacity-70" />
                <input
                  type="search"
                  className="grow"
                  placeholder="Find an event"
                  aria-label="Search events"
                />
              </label>
            </div>

            <div className="mt-4">
              <p className="text-sm font-medium mb-2 text-opacity-75">
                Selected events
              </p>

              {searchedEvents.length > 0 ? (
                <div className="flex flex-row flex-wrap gap-2">
                  {searchedEvents.map((event, i) => (
                    <div
                      key={i}
                      className="badge badge-secondary badge-outline font-1 py-3 px-4 gap-2 transition-all hover:bg-secondary hover:text-secondary-content"
                    >
                      <span className="max-w-40 truncate">{event.name}</span>
                      <button
                        onClick={() => {
                          setSearchedEvents((events) => {
                            return events.filter((event, k) => k !== i);
                          });
                        }}
                        className="hover:text-error hover:cursor-pointer"
                        aria-label={`Remove ${event.name}`}
                      >
                        <XMarkIcon className="w-4 h-4" />
                      </button>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-4 bg-base-200 rounded-lg text-sm text-opacity-60">
                  No events selected. Search and select events above.
                </div>
              )}
            </div>
          </div>

          {/* Quick Start - full width on mobile, right side on md, bottom on xl */}
          <div className="md:flex-1 xl:w-full p-3 rounded-box border-2 dark:border-gray-700 font-1">
            <p className="font-bold">Quick Start</p>

            <div className="divider"></div>

            <div className="menu menu-vertical font-2 gap-2 w-full">
              <button
                onClick={() => setQuickNav("createEvent")}
                className="btn w-full"
              >
                <CalendarDaysIcon className="size-4" />
                Create a new event
              </button>
            </div>
          </div>
        </div>

        {/* Table section - below on mobile/md, right side on xl */}
        {quickNav === "dashboard" && (
          <div className="w-full xl:w-2/3">
            {selectedEvent === null ? (
              <div className="w-full border-2 dark:border-gray-700 rounded-box overflow-y-auto max-h-[70vh] xl:max-h-[85vh] p-3">
                <div className="overflow-x-auto">
                  <table className="table table-zebra">
                    {/* head */}
                    <thead>
                      <tr className="text-center">
                        <th></th>
                        <th>Name</th>
                        <th>Date/Time</th>
                        <th>Type</th>
                        <th>Tickets Sold</th>
                        <th>Visibility</th>
                        <th>CPT</th>
                      </tr>
                    </thead>
                    <tbody>
                      {/* row 1 */}
                      {loading ? (
                        Array(5)
                          .fill(" ")
                          .map((_, i) => (
                            <tr key={i}>
                              <td colSpan={8}>
                                <div
                                  className={`skeleton h-10 w-full ${
                                    i % 2 === 0 ? "bg-base-300" : "bg-neutral"
                                  }`}
                                />
                              </td>
                            </tr>
                          ))
                      ) : events && events.length > 0 ? (
                        <>
                          {events.map((event, i) => (
                            <tr key={i} className="font-1 text-center">
                              <th>
                                <input className="checkbox" type="checkbox" />
                              </th>
                              <td
                                onClick={() => setSelectedEvent(i)}
                                className="link hover:text-blue-500"
                              >
                                {event.name}
                              </td>
                              <td>
                                {new Date(Number(event.startDate))
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
                              </td>
                              <td>{formatString(event.type)}</td>
                              <td>{event.ticketsSold}</td>
                              <td>
                                {event.isActive ? (
                                  <div className="badge badge-success badge-sm badge-outline">
                                    Active
                                  </div>
                                ) : (
                                  <div className="badge badge-error badge-sm badge-outline">
                                    Inactive
                                  </div>
                                )}
                              </td>
                              <td>${event.CPT.toFixed(2)}</td>
                            </tr>
                          ))}
                        </>
                      ) : (
                        <>
                          <tr>
                            <td colSpan={8}>
                              <div className="bg-base-300 rounded-box p-3 min-h-[20vh] py-10">
                                <div className="font-1 font-bold text-lg">
                                  <CalendarDaysIcon className="size-12 mx-auto" />
                                  <p className="text-center">No Events</p>
                                  <div className="w-fit mx-auto mt-3">
                                    <button
                                      className="btn btn-secondary btn-outline mt-4 mx-auto"
                                      onClick={(e) =>
                                        setQuickNav("createEvent")
                                      }
                                    >
                                      Create One
                                      <CalendarDaysIcon className="size-6" />
                                    </button>
                                  </div>
                                </div>
                              </div>
                            </td>
                          </tr>
                        </>
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
            ) : (
              <EventDashboard
                event={events[selectedEvent]}
                setSelectedEvent={setSelectedEvent}
              />
            )}
          </div>
        )}

        {/* Create Event section - full width on all screens */}
        {quickNav === "createEvent" && (
          <div className="w-full xl:w-2/3 xl:mx-auto">
            <div className="w-full max-h-[80vh] overflow-y-auto">
              <div
                className="p-3 bg-base-300 rounded-box flex flex-row items-center mb-2 font-1 select-none gap-2 cursor-pointer"
                onClick={() => setQuickNav("dashboard")}
              >
                <ArrowLeftCircleIcon className="size-6" />
                <p>Go Back</p>
              </div>
              <div className="p-3 font-1 border-2 rounded-box h-fit">
                {notif.message !== "" && (
                  <Notif type={notif.type} message={notif.message} />
                )}
                <p className="text-lg font-semibold">Create New Event</p>

                <div className="flex-col flex gap-3">
                  <div className="flex flex-row gap-3">
                    <div className="">
                      <fieldset className="fieldset font-1">
                        <legend className="fieldset-legend">
                          Name of Event
                        </legend>

                        <input
                          required
                          className="input validator input-bordered"
                          minLength={4}
                          maxLength={200}
                          value={newEvents.name}
                          onChange={(e) => {
                            setNewEvents((prevEvents) => ({
                              ...prevEvents,
                              name: e.target.value,
                            }));
                          }}
                          placeholder="Name of Event"
                        />
                      </fieldset>
                    </div>

                    <div className="">
                      <fieldset className="fieldset">
                        <legend className="fieldset-legend">
                          Type of Event
                        </legend>

                        <select
                          className="select select-bordered min-w-40"
                          value={newEvents.type}
                          onChange={(e) =>
                            setNewEvents((prevEvents) => ({
                              ...prevEvents,
                              type: e.target.value,
                            }))
                          }
                        >
                          <option value="athletic">Athletic</option>
                          <option value="theater">Theater</option>
                          <option value="other">Other</option>
                        </select>
                      </fieldset>
                    </div>
                  </div>

                                    <div className="flex flex-row gap-3 font-1 bg-base-200 p-3">
                    <div className="w-full">
                      <p className="text-lg font-bold mb-2">Choose a date for your event</p>
                      <div className="bg-base-100 border border-base-300 shadow-lg rounded-box p-4">
                        <div className="flex flex-col sm:flex-row items-end gap-3">
                          <div className="w-full sm:w-2/5">
                            <label className="label">
                              <span className="label-text font-medium">Date</span>
                            </label>
                            <input
                              type="date"
                              className="input input-bordered w-full"
                              min={new Date().toISOString().split('T')[0]}
                              onChange={(e) => {
                                // Clear any previous error messages
                                if (notif.message.includes("time")) {
                                  setNotif({ type: "err", message: "" });
                                }
                                
                                const dateParts = e.target.value.split('-').map(Number);
                                const year = dateParts[0];
                                const month = dateParts[1] - 1;
                                const day = dateParts[2];
                                
                                const selectedDate = new Date(year, month, day, 0, 0, 0, 0);
                                const timestamp = selectedDate.getTime();
                                
                                setNewEvents((prevEvents) => ({
                                  ...prevEvents,
                                  startDate: timestamp,
                                  endDate: timestamp,
                                }));
                              }}
                            />
                          </div>
                          
                          <div className="w-full sm:w-1/4">
                            <label className="label">
                              <span className="label-text font-medium">Starts</span>
                            </label>
                            <input
                              type="time"
                              className="input input-bordered w-full"
                              onChange={(e) => {
                                // Clear any previous error messages
                                if (notif.message.includes("time")) {
                                  setNotif({ type: "err", message: "" });
                                }
                                
                                setNewEvents((prevEvents) => {
                                  if (!prevEvents.startDate) {
                                    const today = new Date();
                                    const year = today.getFullYear();
                                    const month = today.getMonth();
                                    const day = today.getDate();
                                    const startDate = new Date(year, month, day, 0, 0, 0, 0);
                                    prevEvents.startDate = startDate.getTime();
                                    prevEvents.endDate = startDate.getTime();
                                  }
                                  
                                  const startDate = new Date(prevEvents.startDate);
                                  const year = startDate.getFullYear();
                                  const month = startDate.getMonth();
                                  const day = startDate.getDate();
                                  
                                  const [hours, minutes] = e.target.value.split(":").map(Number);
                                  
                                  const newStartDate = new Date(year, month, day, hours, minutes, 0, 0);
                                  const timestamp = newStartDate.getTime();
                                  
                                  // If end time is before new start time, adjust end time to start time + 1 hour
                                  let newEndDate = prevEvents.endDate;
                                  if (timestamp >= prevEvents.endDate) {
                                    const endDate = new Date(timestamp);
                                    endDate.setHours(endDate.getHours() + 1);
                                    newEndDate = endDate.getTime();
                                  }
                                  
                                  return {
                                    ...prevEvents,
                                    startDate: timestamp,
                                    endDate: newEndDate
                                  };
                                });
                              }}
                            />
                          </div>
                          
                          <div className="w-full sm:w-1/3">
                            <label className="label">
                              <span className="label-text font-medium">Ends</span>
                            </label>
                            <input
                              type="time"
                              className="input input-bordered w-full"
                              onChange={(e) => {
                                setNewEvents((prevEvents) => {
                                  if (!prevEvents.endDate) {
                                    const today = new Date();
                                    const year = today.getFullYear();
                                    const month = today.getMonth();
                                    const day = today.getDate();
                                    const endDate = new Date(year, month, day, 0, 0, 0, 0);
                                    prevEvents.endDate = endDate.getTime();
                                  }
                                  
                                  const endDate = new Date(prevEvents.endDate);
                                  const year = endDate.getFullYear();
                                  const month = endDate.getMonth();
                                  const day = endDate.getDate();
                                  
                                  const [hours, minutes] = e.target.value.split(":").map(Number);
                                  
                                  const newEndDate = new Date(year, month, day, hours, minutes, 0, 0);
                                  const timestamp = newEndDate.getTime();
                                  
                                  // Only update end time if it's after start time
                                  if (timestamp > prevEvents.startDate) {
                                    // Clear any error message about time when fixed
                                    if (notif.message.includes("time")) {
                                      setNotif({ type: "err", message: "" });
                                    }
                                    
                                    return {
                                      ...prevEvents,
                                      endDate: timestamp
                                    };
                                  } else {
                                    // Show notification for invalid end time
                                    setNotif({
                                      type: "err", 
                                      message: "End time must be after start time"
                                    });
                                    // Return unchanged state
                                    return prevEvents;
                                  }
                                });
                              }}
                            />
                          </div>
                        </div>
                  
                        {newEvents.startDate > 0 && (
                          <div className="mt-4 p-2 bg-base-200 rounded-lg">
                            <div className="flex flex-col sm:flex-row justify-between items-center">
                              <div>
                                <p className="text-sm font-medium">Start:</p>
                                <p className="font-bold">
                                  {new Date(newEvents.startDate).toLocaleDateString('en-US', {
                                    weekday: 'short',
                                    month: 'short',
                                    day: 'numeric',
                                  }) + ' at ' + 
                                  new Date(newEvents.startDate).toLocaleTimeString('en-US', {
                                    hour: '2-digit',
                                    minute: '2-digit',
                                    hour12: true
                                  })}
                                </p>
                              </div>
                              
                              <div className="mt-2 sm:mt-0">
                                <p className="text-sm font-medium">End:</p>
                                <p className="font-bold">
                                  {new Date(newEvents.endDate).toLocaleDateString('en-US', {
                                    weekday: 'short',
                                    month: 'short',
                                    day: 'numeric',
                                  }) + ' at ' + 
                                  new Date(newEvents.endDate).toLocaleTimeString('en-US', {
                                    hour: '2-digit',
                                    minute: '2-digit',
                                    hour12: true
                                  })}
                                </p>
                              </div>
                              
                              <div className="mt-2 sm:mt-0">
                                <p className="text-sm font-medium">Duration:</p>
                                <p className="font-bold">
                                  {Math.floor((newEvents.endDate - newEvents.startDate) / (1000 * 60 * 60))}h {Math.floor(((newEvents.endDate - newEvents.startDate) % (1000 * 60 * 60)) / (1000 * 60))}m
                                </p>
                              </div>
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>

                  <div className="px-3 font-1">
                    <p className="font-bold">Event Details</p>
                    <div className="w-full h-full relative">
                      <textarea
                        maxLength={1000}
                        onChange={(e) =>
                          setNewEvents((prevEvents) => ({
                            ...prevEvents,
                            description: e.target.value,
                          }))
                        }
                        className="textarea textarea-bordered w-full mt-2"
                        placeholder="People should enter using the side door, not the main entrance..."
                      />

                      {newEvents && newEvents.description ? (
                        <>
                          <p className="absolute bottom-2 right-2 bg-base-100">
                            {newEvents.description.length}/1000
                          </p>
                        </>
                      ) : (
                        <>
                          <p className="absolute bottom-2 right-2 bg-base-100">
                            0/1000
                          </p>
                        </>
                      )}
                    </div>
                  </div>

                  <div className="px-3 font-1 mt-3">
                    <p className="font-bold">Event Pricing</p>

                    <div className="flex flex-col sm:flex-row items-end gap-4">
                      <div className="form-control w-full max-w-xs">
                        <label className="label">
                          <span className="label-text">Price</span>
                        </label>
                        <label className="input input-bordered flex items-center gap-2">
                          <CurrencyDollarIcon className="w-6 h-6" />
                          <input
                            type="number"
                            onChange={(e) => {
                              setCurrentTicket((prevTicket) => ({
                                ...prevTicket,
                                price: Number(e.target.value),
                              }));
                            }}
                            value={currentTicket.price}
                            min="0"
                            className="grow font-bold text-center"
                            placeholder="Dollar Amount"
                          />
                        </label>
                      </div>

                      <div className="form-control w-full max-w-xs">
                        <label className="label">
                          <span className="label-text">Ticket Name</span>
                        </label>
                        <label className="input input-bordered flex items-center gap-2">
                          <BookOpenIcon className="w-6 h-6" />
                          <input
                            type="text"
                            value={currentTicket.name}
                            onChange={(e) => {
                              setCurrentTicket((prevTicket) => ({
                                ...prevTicket,
                                name: e.target.value,
                              }));
                            }}
                            className=" font-bold text-center  max-w-40"
                            placeholder="Ticket Name"
                          />
                        </label>
                      </div>

                      <button
                        className="btn btn-primary mt-4 sm:mt-0"
                        onClick={(e) => {
                          if (
                            currentTicket.price > 0 &&
                            isString(currentTicket.name, 100)
                          ) {
                            setNewEvents((prevEvents) => ({
                              ...prevEvents,
                              options: [
                                ...prevEvents.options,
                                {
                                  price: Number(currentTicket.price).toFixed(2),
                                  name: formatString(currentTicket.name),
                                },
                              ],
                            }));
                            setCurrentTicket({ price: 0, name: "" });
                          }
                        }}
                      >
                        New Ticket
                        <TicketIcon className="w-6 h-6" />
                      </button>
                    </div>

                    <div className="flex flex-col mt-4 gap-2">
                      {newEvents.options && newEvents.options.length > 0 ? (
                        <>
                          {newEvents.options.map((ticket, i) => (
                            <div
                              key={i}
                              className="p-3 border border-dashed rounded-lg"
                            >
                              <div className="flex flex-row items-center gap-4">
                                <div className="flex-1">
                                  <p>${ticket.price}</p>
                                  <p className="font-bold">{ticket.name}</p>
                                </div>

                                <button
                                  onClick={(e) => {
                                    setNewEvents((prevEvents) => {
                                      const prevList = prevEvents.options;

                                      return {
                                        ...prevEvents,
                                        options: prevList.filter(
                                          (__, k) => k !== i
                                        ),
                                      };
                                    });
                                  }}
                                  className="btn btn-circle btn-ghost"
                                >
                                  <TrashIcon className="w-6 h-6 text-red-500  " />
                                </button>
                              </div>
                            </div>
                          ))}
                        </>
                      ) : (
                        <>
                          <div className="bg-base-200 p-3 border-2 border-base-100 font-1 font-bold rounded-lg">
                            <p className="text-center">
                              No Ticket options added
                            </p>
                          </div>
                        </>
                      )}
                    </div>
                  </div>

                  <div className="">
                    <div className="divider"></div>

                    <div className="font-1 p-2">
                      <p className="mb-4 font-bold">Sample Ticket</p>
                      {/* This is the styling for a ticket */}
                      <div className="bg-base-200 p-4 rounded-box sm:justify-start justify-center flex gap-4 items-center sm:flex-row flex-col">
                        <div className="badge badge-neutral badge-lg font-1">
                          {formatString(newEvents.type)}
                        </div>
                        <div>
                          <TicketIcon className="size-8" />
                        </div>

                        <div className="font-1 flex flex-col text-center">
                          {newEvents &&
                            newEvents.startDate &&
                            newEvents.endDate && (
                              <>
                                <p className=" font-extrabold text-2xl ">
                                  {" "}
                                  {
                                    weekDays[
                                      new Date(newEvents.startDate).getDay()
                                    ]
                                  }
                                </p>
                                <p>
                                  {
                                    months[
                                      new Date(newEvents.startDate).getMonth()
                                    ]
                                  }{" "}
                                  {new Date(newEvents.startDate).getDate()}
                                </p>
                                <p>
                                  {new Date(newEvents.startDate).toLocaleString(
                                    "en-US",
                                    {
                                      hour: "numeric",
                                      minute: "numeric",
                                      hour12: true,
                                    }
                                  )}
                                </p>
                              </>
                            )}
                        </div>

                        <div className="font-2 sm:ml-4 text-lg font-semibold flex-1">
                          <p>
                            {newEvents.name ? newEvents.name : "Event Name"}
                          </p>
                        </div>

                        <div>
                          <a className="btn btn-neutral font-1 font-semibold">
                            Buy Ticket
                            <ArrowTopRightOnSquareIcon className="w-6 h-6" />
                          </a>
                        </div>
                      </div>
                    </div>
                    <div className="divider"></div>
                    <div className="p-2">
                      <p className="font-1 font-bold">Looks good?</p>
                      <div className="font-1 mt-1 mb-3 p-3 text-base bg-base-300 rounded-box">
                        <div className="flex flex-row gap-4 items-center ">
                          <p>Visible</p>
                          <input
                            type="checkbox"
                            checked={newEvents.isActive}
                            onClick={(e) => {
                              setNewEvents((prevEvents) => ({
                                ...prevEvents,
                                isActive: !prevEvents.isActive,
                              }));
                            }}
                            defaultChecked
                            className="toggle toggle-success"
                          />
                        </div>
                        <div role="alert" className="alert alert-info mt-3">
                          <InformationCircleIcon className="w-6 h-6" />
                          <span className="text-info-content">
                            If toggled, people will be able to buy tickets once
                            this event is created.
                          </span>
                        </div>
                      </div>

                      <button
                        className="btn mt-2 btn-secondary"
                        onClick={createEvent}
                      >
                        Create event
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
}
