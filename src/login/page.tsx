import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import callApi from "../functions/functions";
import Navbar from "../components/Navbar";
import Notif from "../components/Notif";
import Footer from "../components/Footer";
import { Helmet, HelmetProvider } from "react-helmet-async";
import { isPassword, isEmail } from "../functions/functions.js";
import { InformationCircleIcon } from "@heroicons/react/24/outline";
import { Link } from "react-router-dom";
import type {Timeout} from "../types.ts"

let timeout: Timeout;
export default function Login() {
  const [searchParams] = useSearchParams();
  const returnUrl = searchParams.get("returnUrl") || "/";

  const [loading, setLoading] = useState(false);
  
  // Modified to use returnUrl instead of hardcoded "/"
  useEffect(() => {
    if (sessionStorage.getItem("user")) {
      window.location.replace(returnUrl);
    }
  }, [returnUrl]);

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

  const [user, setUser] = useState({
    email: "",
    password: "",
    isAdmin: false,
    isSecurity: false,
    returnUrl: returnUrl,
  });

  const handleSubmit = () => {
    console.log("this was clicked");
    setLoading(true);
    if (!isPassword(user.password) || !isEmail(user.email)) {
      setNotif({ type: "err", message: "Invalid Credentials" });
      setLoading(false);
    } else {
      callApi("/login", "POST", user).then((res) => {
        if (res.code === "err") {
          setNotif({ type: "err", message: "Invalid Credentials" });
          setLoading(false);
        } else {
          // Always use returnUrl from state to ensure it's preserved throughout the session
          setNotif({ type: "success", message: "Successful" });
          setLoading(false);
          window.location.replace(returnUrl);
        }
      });
    }
  };

  return (
    <>
  
    <HelmetProvider>


 <Helmet>
            <meta charSet="utf-8" />
      
              <title>Sign in • ticketnest</title>
            <meta
      name="description"
      content={`Sign into your ticketnest account to view your tickets and events. `}
    />
            
            </Helmet>



    <section className="h-screen">
        <Navbar />

        {notif.message !== "" && (
          <Notif type={notif.type} message={notif.message} />
        )}

        <div className="mx-auto p-4 sm:w-2/6 rounded-box mb-24 sm:mt-10">
          {/* Return notification banner - added to show where user will go after login */}
          {returnUrl && returnUrl !== "/" && (
            <div role="alert" className="alert alert-info mb-4">
              <InformationCircleIcon className="size-6" />
              <span>You'll return to your purchase after login</span>
            </div>
          )}

          <div className="p-3">
            <p className=" text-3xl font-1 font-bold">Login</p>
            <p className="text-lg">Log into your account</p>
          </div>

          <div className="p-3 rounded-box">
            <div className="flex flex-col gap-2 font-2">
              <div className="flex flex-col">
                <input
                  id="email"
                  required
                  type="email"
                  className="input input-bordered w-full input-xl validator"
                  placeholder="Email"
                  value={user.email}
                  onChange={(e) => {
                    setUser((prevUser) => {
                      return {
                        ...prevUser,
                        [e.target.id]: e.target.value.toLowerCase(),
                      };
                    });
                  }}
                />
                <p className="validator-hint font-1 hidden">
                  Email Address is required
                </p>
              </div>

              <div className="flex flex-col">
                <input
                  id="password"
                  required
                  type="password"
                  className="input input-bordered input-xl w-full validator"
                  placeholder="Password"
                  value={user.password}
                  onChange={(e) => {
                    setUser((prevUser) => {
                      return { ...prevUser, [e.target.id]: e.target.value };
                    });
                  }}
                />
                <p className="validator-hint font-1 hidden">
                  Password is required
                </p>
              </div>

              <div className="flex flex-row gap-2 mb-2">
                <input
                  type="checkbox"
                  checked={user.isAdmin}
                  onChange={(e) => {
                    setUser((prevUser) => ({
                      ...prevUser,
                      isAdmin: Boolean(e.target.checked),
                      isSecurity: Boolean(!e.target.checked),
                    }));
                  }}
                  className="checkbox"
                />
                <p>Admin Account</p>
              </div>
              {!loading ? (
                <button
                  className="btn btn-md btn-success"
                  onClick={handleSubmit}
                >
                  Submit
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    className="size-6"
                  >
                    <path
                      fillRule="evenodd"
                      d="M7.5 6a4.5 4.5 0 1 1 9 0 4.5 4.5 0 0 1-9 0ZM3.751 20.105a8.25 8.25 0 0 1 16.498 0 .75.75 0 0 1-.437.695A18.683 18.683 0 0 1 12 22.5c-2.786 0-5.433-.608-7.812-1.7a.75.75 0 0 1-.437-.695Z"
                      clipRule="evenodd"
                    />
                  </svg>
                </button>
              ) : (
                <button className="btn btn-md btn-disabled gap-4">
                  Submit<div className="loading loading-spinner"></div>
                </button>
              )}
            </div>
          </div>

          <div className="divider"></div>

          <div className="text-center font-2">
            <p>Don't have an account</p>
            {/* Updated to pass returnUrl to signup page */}
            <Link to={`/signup?returnUrl=${encodeURIComponent(returnUrl)}`} className="link link-primary">
              Signup instead
            </Link>
          </div>
        </div>
      </section>

      <Footer />

    </HelmetProvider>
    
   
            
        
     

     
    </>
  );
}
