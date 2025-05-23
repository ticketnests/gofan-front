import { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { callApi, isEmail, isPassword, isString } from "../functions/functions";
import { Helmet, HelmetProvider } from "react-helmet-async";
import Notif from "../components/Notif";
import { Link } from "react-router-dom";
import type {Timeout, NewUser, NotifType, ResType} from "../types"

let timeout: Timeout;




export default function Signup() {
  const [user, setUser] = useState<NewUser>({
    email: "",
    password: "",
    name: "",
    confirmPassword: "",
  });

  const [notif, setNotif] = useState<NotifType>({
    type: "err",
    message: "",
  });

  useEffect(() => {
    timeout = setTimeout(() => {
      setNotif({
        type: "err",
        message: "",
      });
    }, 5000);

    return () => {
      clearTimeout(timeout);
    };
  }, [notif]);

  const handleSubmit = () => {
    if (!isEmail(user.email)) {
      setNotif(() => ({ type: "err", message: "Enter a valid email" }));
    } else if (!isPassword(user.password)) {
      setNotif(() => ({
        type: "err",
        message: "Enter a password between 4 and 15 characters long",
      }));
    } else if (!isString(user.name)) {
      setNotif(() => ({ type: "err", message: "Enter your name" }));
    } else if (user.password !== user.confirmPassword) {
      setNotif(() => ({
        type: "err",
        message: "Your passwords don't match",
      }));
    } else {
      callApi("/register", "POST", user).then((res: ResType) => {
        if (res.message === "login") {
          window.location.replace("/login");
        } else if (res.code === "err") {
          setNotif(() => ({
            type: "err",
            message: "Invalid request",
          }));
        } else if (res.code === "ok") {
          setNotif(() => ({
            type: "success",
            message: "Successful Account Creation",
          }));
          window.location.replace("/");
        } else {
          setNotif(() => ({
            type: "err",
            message: "Something went wrong",
          }));
        }
      });
    }
  };

  return (
    <>
  <HelmetProvider>

    <Helmet>
            <meta charSet="utf-8" />
            <title>Make an account • ticketnest</title>
            <meta
      name="description"
      content={`Make ticketing easy by creating your account today!`}
    />
      </Helmet>
        
        <section className="h-screen">
        <Navbar />
        {notif.message !== "" && (
          <Notif type={notif.type} message={notif.message} />
        )}

        <div className="mx-auto p-4 sm:w-2/6 rounded-box mb-12 sm:mt-10">
          <div className="p-3">
            <p className=" text-2xl font-1 font-bold">Signup</p>
            <p>
              Creating an account is free and allows for easy ticket retrieval
            </p>
          </div>

          <div className=" p-3 rounded-box">
            <div className="flex flex-col gap-2 font-2">
              <div className="flex flex-col">
                {/* <p  className="font-semibold">Email</p> */}
                <input
                  id="email"
                  required
                  type="email"
                  className="input validator input-bordered w-full"
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
                {/* <p  className="font-semibold">Name</p> */}
                <input
                  id="name"
                  required
                  type="text"
                  className="input input-bordered w-full  validator"
                  placeholder="Name"
                  value={user.name}
                  onChange={(e) => {
                    setUser((prevUser) => {
                      return { ...prevUser, [e.target.id]: e.target.value };
                    });
                  }}
                />
                <p className="validator-hint font-1 hidden">Name is required</p>
              </div>

              <div className="flex flex-col">
                {/* <p  className="font-semibold">Password</p> */}
                <input
                  id="password"
                  required
                  minLength={4}
                  maxLength={15}
                  type="password"
                  className="input input-bordered w-full validator"
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

              <div className="flex flex-col">
                {/* <p  className="font-semibold">Confirm Password</p> */}
                <input
                  id="confirmPassword"
                  required
                  type="password"
                  className="input w-full input-bordered"
                  placeholder="Confirm Password"
                  value={user.confirmPassword}
                  onChange={(e) => {
                    setUser((prevUser) => {
                      return { ...prevUser, [e.target.id]: e.target.value };
                    });
                  }}
                />
                <p className="validator-hint font-1 hidden">
                  Confirm Password is required
                </p>
              </div>

              <button className="btn btn-success" onClick={handleSubmit}>
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
            </div>
          </div>

          <div className="divider"></div>

          <div className="text-center font-2">
            <p>Already have an account?</p>
            <Link to="/login" className="link link-primary">
              Login instead
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    
  </HelmetProvider>

    
    </>
  );
}
