import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { callApi, formatString } from "../functions/functions";
// import {Helmet} from "react-helmet";
import { Link } from "react-router-dom";

import type {School} from "../types"
import {
  ArrowLeftCircleIcon,

} from "@heroicons/react/24/outline";

export default function School() {
  const { schoolId } = useParams();
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

  const [school, setSchool] = useState<School | null>(null);
  const [prevUrl, setPrevUrl] = useState<string | null>(null);

  useEffect(() => {

    if (prevUrl ===null) {
      

      if (document.referrer.includes("localhost:5173") || document.referrer.includes("ticketnest.us")) {
        setPrevUrl(document.referrer);
        



      } else {
        setPrevUrl("/")
      }

    }
    
    callApi("/getSchool", "POST", {
      uuid: schoolId,
    }).then((res) => {
      if (res.code === "ok") {
        setSchool(JSON.parse(res.message));
        console.log(res.message);
      } else {
        window.location.replace("/");
      }
    });
  }, [prevUrl]);

  return (
    <>
    
      <section className="h-screen overflow-y-auto">
        <Navbar />

        <div className="sm:w-4/6 w-5/6 mx-auto flex flex-col gap-3">
        <Link to={prevUrl ? prevUrl : "/"}
                className="p-3 bg-base-300 rounded-box flex flex-row items-center mt-2 font-1 select-none gap-2 cursor-pointer"
              >
                <ArrowLeftCircleIcon className="size-6" />
                <p>Go Back</p>
              </Link>
          
          {school != null && (



            <div
              id="#uptop"
              className="w-full bg-base-200 p-4 border rounded-lg"
            >
              <div className=" font-1">
                <p className="text-xl font-bold sm:text-left text-center">
                  {formatString(school.name)} Events
                </p>
                {(school.address!=='N/A') && (
 <p className="sm:text-left text-center">
                  
 {formatString(school.address)}
 
 </p>
                )}
               
              </div>
            </div>
          )}

          <div className="rounded-lg">
            {school !== null && (
              <p className="font-1 sm:font-normal font-bold sm:text-left text-center sm:text-base text-xl">
                Upcoming events
              </p>
            )}

            <div className="flex flex-col mt-4 gap-4">
              {/* {console.log("events", school)} */}

              {school === null ? (
                <>
                  <div className="skeleton bg-neutral p-4 w-full h-14"></div>

                  <div className="skeleton mt-4 w-full h-28"></div>
                  <div className="skeleton mt-4 w-full h-28"></div>
                  <div className="skeleton mt-4 w-full h-28"></div>
                </>
              ) : (
                <>
                  {school != null && school.events.length > 0 ? (
                    <>
                      {school.events.map((event, i) => (
                        <div
                          key={i}
                          className="bg-base-200 p-4 rounded-box sm:justify-start justify-center flex gap-4 items-center sm:flex-row flex-col"
                        >
                          <div className="badge badge-neutral badge-lg font-1">
                            {formatString(event.type)}
                          </div>
                          <div>
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              viewBox="0 0 24 24"
                              fill="currentColor"
                              className="size-8"
                            >
                              <path
                                fillRule="evenodd"
                                d="M19.952 1.651a.75.75 0 0 1 .298.599V16.303a3 3 0 0 1-2.176 2.884l-1.32.377a2.553 2.553 0 1 1-1.403-4.909l2.311-.66a1.5 1.5 0 0 0 1.088-1.442V6.994l-9 2.572v9.737a3 3 0 0 1-2.176 2.884l-1.32.377a2.553 2.553 0 1 1-1.402-4.909l2.31-.66a1.5 1.5 0 0 0 1.088-1.442V5.25a.75.75 0 0 1 .544-.721l10.5-3a.75.75 0 0 1 .658.122Z"
                                clipRule="evenodd"
                              />
                            </svg>
                          </div>

                          <div className="font-1 flex flex-col text-center">
                            <p className=" font-extrabold text-2xl ">
                              {" "}
                              {weekDays[new Date(event.startDate).getDay()]}
                            </p>
                            <p>
                              {months[new Date(event.startDate).getMonth()]}{" "}
                              {new Date(event.startDate).getDate()}
                            </p>
                            <p>
                              {new Date(event.startDate).toLocaleString(
                                "en-US",
                                {
                                  hour: "numeric",
                                  minute: "numeric",
                                  hour12: true,
                                }
                              )}
                            </p>
                          </div>

                          <div className="font-2 sm:ml-4 text-2xl sm:text-lg sm:text-left text-center font-semibold flex-1">
                            <p>{event.name}</p>
                          </div>

                          <div className="">
                            <Link
                              to={"/purchase/" + schoolId + "/" + event?.id}
                              className="btn btn-neutral font-1 font-semibold"
                            >
                              Buy Ticket
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 24 24"
                                fill="currentColor"
                                className="size-6"
                              >
                                <path
                                  fillRule="evenodd"
                                  d="M16.72 7.72a.75.75 0 0 1 1.06 0l3.75 3.75a.75.75 0 0 1 0 1.06l-3.75 3.75a.75.75 0 1 1-1.06-1.06l2.47-2.47H3a.75.75 0 0 1 0-1.5h16.19l-2.47-2.47a.75.75 0 0 1 0-1.06Z"
                                  clipRule="evenodd"
                                />
                              </svg>
                            </Link>
                          </div>
                        </div>
                      ))}
                    </>
                  ) : (
                    <>
                      <div className=" min-h-[50vh] ">
                        <div className=" border-2 p-8 rounded-box font-1 font-bold">
                          <p className="text-center">No events found</p>
                        </div>
                      </div>
                    </>
                  )}
                </>
              )}
            </div>

            <div className="w-fit mx-auto my-4 font-1 text-center">
              <button
                className="btn btn-outline font-1 "
                onClick={() => window.scrollTo(0, 0)}
              >
                Go to top
              </button>

              <p className="mt-4  text-sm">Don't see an event?</p>
              <p className="text-sm">
                Try{" "}
                <Link to={window.location} className="link link-accent">
                  refreshing
                </Link>{" "}
                the page
              </p>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
}