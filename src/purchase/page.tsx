import { useEffect, useState, useContext } from "react";
import { useParams } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { callApi } from "../functions/functions";
import Notif from "../components/Notif";
import LoggedInContext from "../functions/contexts";
import { ArrowLeftIcon, ExclamationTriangleIcon, InformationCircleIcon, ShoppingBagIcon } from "@heroicons/react/24/outline";
import { Link } from "react-router-dom";
import useSession from "../functions/auth"
import type { Timeout, PriceOption, ClientEvent } from "../types"

let timeout: Timeout;

interface ApiData {
    schoolId: string;
    school: string;
    address: string;
    event: ClientEvent,
    options: PriceOption[],
}


export default function Purchase() {
  const { gameId, schoolId } = useParams();

//   console.log(gameId, schoolId);

  const [apiData, setApiData] = useState<ApiData | undefined>();

  const [cartIsOpen, setCartIsOpen] = useState<boolean>(false);

  const [total, setTotal] = useState<string | number>(0);    



  useEffect(() => {
    let newTotal: number = 0;
    if (apiData != undefined) {
      apiData.options.forEach((price) => {
        newTotal += Number(Number(price.price) * Number(price.amountOfTickets));
      });
      setTotal(newTotal.toFixed(2));
    }
  }, [cartIsOpen]);

  const loggedIn = useContext(LoggedInContext);
  const [isAdmin, setIsAdmin] = useState(
    useSession()?.isAdmin
  );

  useEffect(() => {
    function x() {
      const user = useSession();
      if (user !== null) {
        setIsAdmin(user?.isAdmin);
      }
  
      callApi("/getGame", "POST", {
        schoolId: schoolId,
        gameId: gameId,
      }).then((res) => {
        if (res.code === "ok") {
          setApiData(JSON.parse(res.message));
          console.log(res.message);
        } else {
          window.location.replace("/");
        }
      });
    }
   
    x();
  }, [gameId]);

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

  const handleCart = () => {
    let handleBool = false;
    if (apiData) {
        for (let i = 0; i < apiData.options.length; i++) {
            if (apiData.options[i].amountOfTickets != 0) {
              console.log("a");
              handleBool = true;
              break;
            }
          }
    }
   

    if (handleBool) {
      console.log("cut me some slack");
      setCartIsOpen(true);
    }
  };

  const [loading, setLoading] = useState(false);
  const handlePurchase = () => {
    setLoading(true);
    if (loggedIn&&apiData) {
      let totalAmt = 0;
      for (let i = 0; i < apiData.options.length; i++) {
        if (Number(apiData.options[i].amountOfTickets) > 0) {
          totalAmt += Number(apiData.options[i].amountOfTickets);
        }
      }

      if (totalAmt > 0 && totalAmt <= 9) {
        // startDate, endDate, name, school
        callApi("/create-checkout-session", "POST", {
          items: apiData.options,
          eventId: apiData.event.eventId,
          startDate: apiData.event.startDate,
          endDate: apiData.event.endDate,
          name: apiData.event.name,
          school: apiData.school,
          schoolId: apiData.schoolId,
        }).then((res) => {
          if (res.code === "err") {
            setNotif({ type: "err", message: "Something went wrong" });
          } else {
            const x = JSON.parse(res.message);
            // console.log(x.url)
            window.location.replace(x.url);
          }
        });
      } else {
        setLoading(false);
        setNotif({
          type: "err",
          message: "Can only buy at max 9 tickets per order",
        });
      }
    } else {
      setLoading(false);
      window.location.replace(`/login?returnUrl=${encodeURIComponent(window.location.pathname)}`);
    }
  };

  return (
    <>
      <section className="min-h-screen">
        <Navbar />
        <div className=" p-2 flex flex-row gap-1 bg-base-200">
          <Link to={"/school/" + schoolId} className="btn btn-ghost font-1">
            <ArrowLeftIcon className="size-6" />
            Go Back
          </Link>
        </div>

        {apiData === undefined && (
          <div className="relative h-[90vh] w-full">
            <div className="loading loading-spinner size-20 text-primary absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%]"></div>
          </div>
        )}
        {cartIsOpen && (
          <>
            {notif.message !== "" && (
              <Notif type={notif.type} message={notif.message} />
            )}

            <div className="sm:w-4/6 w-5/6 mx-auto mt-10 font-1 flex flex-col sm:grid sm:grid-cols-2 gap-4 my-2">
              <div>
                <p className="text-4xl font-semibold">Review and buy</p>

                <p className="sm:mt-8 text-lg font-1 ">
                  Pay with Paypal or Credit Card
                </p>

                {loggedIn ? (
                  <>
                    {isAdmin && (
                      <>
                        <div className="alert alert-error mt-4">
                          <ExclamationTriangleIcon className="size-6" />

                          <p>
                            {" "}
                            You are currently logged in as an Admin or Security
                            user. You cannot buy tickets as an admin or security
                            user.
                          </p>
                        </div>
                      </>
                    )}
                  </>
                ) : (
                  <>
                    <div className="flex font-1 w-full flex-col">
                      <div className="mt-4 p-3 border rounded-box">
                        <p className="font-semibold">Sign into your account</p>
                        <p className="text-sm">
                          Your ticket will be sent to your email
                        </p>

                        <Link
                          to={`/login?returnUrl=${encodeURIComponent(window.location.pathname)}`}
                          className="p-2 flex flex-col gap-5 font-1"
                        >
                          <button className="btn btn-md btn-primary btn-outline font-1 text-lg">
                            Sign In
                          </button>
                        </Link>
                      </div>

                      <div className="divider">Or</div>

                      <div className="">
                        <p className="font-bold">Sign up</p>
                        <p className="text-sm">
                          Creating an account is free and access{" "}
                        </p>
                        <Link
                          to="/signup"
                          className="btn btn-outline w-full mt-3"
                        >
                          Signup
                        </Link>
                      </div>
                    </div>
                  </>
                )}
              </div>

              <div className="p-3 rounded-box border flex flex-col gap-2">
                <div className="flex flex-col gap-2 border-b pb-2">
                  <p className="">{apiData?.school}</p>

                  <p className="font-bold">{apiData?.event.name}</p>

                  <p className="">
                    {new Date(apiData ? apiData.event.startDate : 0).toLocaleDateString(
                      "en-US",
                      {
                        month: "long",
                        day: "numeric",
                        year: "numeric",
                      }
                    )}
                  </p>
                  <p>
                    {new Date(apiData ? apiData.event.startDate : 0).toLocaleString("en-US", {
                      hour: "numeric",
                      minute: "numeric",
                      hour12: true,
                    })}{" "}
                    -{" "}
                    {new Date(apiData ? apiData.event.endDate : 0).toLocaleString("en-US", {
                      hour: "numeric",
                      minute: "numeric",
                      hour12: true,
                    })}
                  </p>
                </div>
                <div className=" flex flex-col p-2 gap-4">
                  {/* {
                name: "Adult Pass",
                price: 10.99,
                amountOfTickets: 0,
        // Specify ticket prices and options
            } */}
                  {apiData?.options.map((ticket, i) => (
                    <div key={i}>
                      <div className="flex flex-row gap-2 items-center justify-between">
                        <p className="">{ticket.name}</p>
                        <input
                          type="number"
                          min="0"
                          className="input input-bordered text-lg max-w-40 w-fit font-bold text-center"
                          value={ticket.amountOfTickets}
                      onChange={(e) => {
                        setApiData((prevData) => {
                          if (!prevData) return prevData;
                          const newOptions = prevData.options.map((option, idx) =>
                            idx === i
                              ? { ...option, amountOfTickets: Number(e.target.value) }
                              : option
                          );
                      
                          let newTotal = 0;
                          newOptions.forEach((price) => {
                            newTotal += Number(price.price) * Number(price.amountOfTickets);
                          });
                          setTotal(newTotal.toFixed(2));
                      
                          return { ...prevData, options: newOptions };
                        });
                      }}
                        />
                      </div>

                      <div className="flex flex-row items-center justify-between">
                        <p
                          className="link text-sm"
                          onClick={() => {
                            setApiData((prevData) => {
                              if (!prevData) return prevData;
                              const newOptions = prevData.options.map((option, idx) =>
                                idx === i
                                  ? { ...option, amountOfTickets: 0 }
                                  : option
                              );

                              let newTotal = 0;
                              newOptions.forEach((price) => {
                                newTotal += Number(price.price) * Number(price.amountOfTickets ?? 0);
                              });
                              setTotal(newTotal.toFixed(2));

                              return { ...prevData, options: newOptions };
                            });
                          }}
                        >
                          Remove
                        </p>
                        <p className="text-sm font-bold">
                          $
                          {Number(
                            Number(ticket.price) * Number(ticket.amountOfTickets)
                          ).toFixed(2)}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="bg-base-100 w-full p-2 gap-y-1 grid mt-5 grid-cols-2">
                  <div className="justify-self-start">
                    <p className="font-semibold">Subtotal</p>
                  </div>
                  <div className="justify-self-end">
                    <p className="font-bold">${total}</p>
                  </div>

                  <div className=" col-span-2 mt-4 grid grid-cols-2 items-center">
                    <p className="font-bold text-lg">Total</p>

                    {!isNaN(Number(total)) ? (
                      <p className="justify-self-end font-1 font-bold">
                        ${Number(total).toFixed(2)}
                      </p>
                    ) : (
                      <p>$0.00</p>
                    )}
                  </div>
                </div>
                {loading ? (
                  <>
                    <div
                      
                      className="btn w-full mt-2 btn-lg btn-secondary btn-disabled"
                    >
                      <p className="font-1 text-lg">Purchase Now</p>
                      <span className="loading loading-spinner loading-md"></span>
                    </div>
                  </>
                ) : (
                  <>
                    <div
                      className="btn w-full mt-2 btn-lg btn-secondary"
                      onClick={handlePurchase}
                    >
                      <p className="font-1 text-lg">Purchase Now</p>
                    </div>
                  </>
                )}
              </div>
            </div>
          </>
        )}

        {!cartIsOpen && (
          <div className="sm:w-3/6 w-5/6 mx-auto  mt-10 font-1">
            {apiData != null && (
              <>
                <div role="alert" className="alert alert-warning">
                  <ExclamationTriangleIcon className="h-6 w-6 shrink-0 stroke-current" />
                  <span>
                    Event Info: By attending this event, you accept to represent{" "}
                    {apiData.school}'s values
                  </span>
                </div>

                <div className="mt-2 font-1 bg-base-300 rounded-box p-4">
                  <p className="font-1 text-sm">{apiData.school} events</p>
                  <p className="font-1 font-bold text-3xl">
                    {apiData.event.name}
                  </p>
                  <p>
                    {new Date(apiData.event.startDate).toLocaleDateString() +
                      " at " +
                      new Date(apiData.event.startDate).toLocaleString(
                        "en-US",
                        { hour: "numeric", minute: "numeric", hour12: true }
                      )}{" "}
                    -{" "}
                    {new Date(apiData.event.endDate).toLocaleDateString() +
                      " at " +
                      new Date(apiData.event.endDate).toLocaleString("en-US", {
                        hour: "numeric",
                        minute: "numeric",
                        hour12: true,
                      })}{" "}
                  </p>
                </div>
                <div className="bg-info w-5/6 mx-auto mt-2 p-3 text-info-content font-1 rounded-box">
                  <div className="flex flex-row items-center gap-2 mx-auto w-fit">
                    <InformationCircleIcon className="size-6" />
                    <p>Ticket will be emailed</p>
                  </div>
                </div>

                {/* ticket pricing */}
                <div className="flex flex-col gap-4 mt-4 ">
                  {apiData.options.map((thing, i) => (
                    <div
                      key={i}
                      className="p-4 py-6 w-full max-w-full bg-base-300 justify-between items-center flex flex-row gap-2 rounded-box"
                    >
                      <div className="flex font-1 flex-col">
                        <p className="font-bold">{thing.name}</p>
                        <p className="">${thing.price}</p>
                      </div>

                      <div className="w-fit">
                        <input
                          type="number"
                          min="0"
                          className="input w-full max-w-[100vw] input-bordered text-center text-lg "
                          value={thing.amountOfTickets}
                          onChange={(e) => {
                            setApiData((prevData) => {
                              if (!prevData) return prevData;
                              const newOptions = prevData.options.map((option, idx) =>
                                idx === i
                                  ? { ...option, amountOfTickets: Number(e.target.value) }
                                  : option
                              );

                              let newTotal = 0;
                              newOptions.forEach((price) => {
                                newTotal += Number(price.price) * Number(price.amountOfTickets);
                              });
                              setTotal(newTotal.toFixed(2));

                              return { ...prevData, options: newOptions };
                            });
                          }}
                        />
                      </div>
                    </div>
                  ))}

                  <button
                    className="btn btn-lg btn-outline font-1"
                    onClick={handleCart}
                  >
                    Add to Cart
                    <ShoppingBagIcon className="size-6" />
                  </button>
                  <div className="text-center font-1 text-sm">
                    <p className="">These prices include taxes and fees</p>
                    <p className="">All purchases aren't refundable</p>
                  </div>

                  <div>
                    <p className="font-1 font-bold text-lg">Event details</p>

                    <div className="p-3 bg-base-300 rounded-sm mt-2 mb-2">
                      <p className="font-bold text-lg">{apiData.school}</p>

                      <p className="mt-2 text-sm">{apiData.address}</p>

                      <div className="bg-base-100 flex flex-col p-2 rounded-box mt-4">
                        <p className="font-bold font-1 mb-3">
                          Event Description
                        </p>

                        <p className="font-1 text-sm">
                          {apiData.event.description}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                <div></div>
              </>
            )}
          </div>
        )}
      </section>

      <Footer />
    </>
  );
}
