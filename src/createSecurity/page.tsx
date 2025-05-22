import { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { useParams } from "react-router-dom";
import Notif from "../components/Notif";
import { callApi, isPassword, isString } from "../functions/functions";
import type {Timeout, NotifType, ResType} from "../types"
let timeout: Timeout;
export default function SecuritySignup() {
  const { id } = useParams();

  const [user, setUser] = useState({
    uuid: id,
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

  const createAccount = () => {
    if (!isPassword(user.password)) {
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
      callApi("/createSecurity", "POST", user).then((res: ResType) => {
        if (res.code === "err") {
          setNotif({ type: "err", message: "Something went wrong" });
        } else if (res.code === "ok") {
          setNotif({ type: "success", message: "Successful setup account" });
          window.location.replace("/scanuser");
        } else {
          setNotif({ type: "err", message: "Something went wrong" });
        }
      });
    }
  };

  return (
    <>
      {/* bg-gradient-to-b from-base-100 to-base-300 */}
      <div className="min-h-screen">
        <Navbar />
        {notif.message !== "" && (
          <Notif type={notif.type} message={notif.message} />
        )}
        <div className="w-full h-full sm:p-0 p-2">
          <div className=" sm:w-2/6 rounded-box h-full sm:mt-10 mx-auto">
            <div className="p-3 bg-base-300 mb-2 font-1 rounded-box">
              <p className=" text-3xl font-1 font-bold">
                Finish Creating your Account
              </p>
              <p className="text-lg">Easy as 1, 2, 3</p>
            </div>

            <div className="bg-base-300 font-1 p-4 rounded-box flex flex-col gap-2">
              <div className="w-full">
                {/* <p className="text-sm">Name</p> */}
                <input
                  className="input w-full"
                  placeholder="Name:"
                  id="name"
                  value={user.name}
                  onChange={(e) => {
                    setUser((prevUser) => {
                      return {
                        ...prevUser,
                        [e.target.id]: e.target.value.toLowerCase(),
                      };
                    });
                  }}
                />
              </div>
              <div className="w-full">
                {/* <p className="text-sm">Name</p> */}
                <input
                  id="password"
                  type="password"
                  className="input w-full"
                  placeholder="Password:"
                  value={user.password}
                  onChange={(e) => {
                    setUser((prevUser) => {
                      return {
                        ...prevUser,
                        [e.target.id]: e.target.value.toLowerCase(),
                      };
                    });
                  }}
                />
              </div>

              <div className="">
                {/* <p className="text-sm">Name</p> */}
                <input
                  className="input w-full"
                  type="password"
                  placeholder="Confirm Password:"
                  id="confirmPassword"
                  value={user.confirmPassword}
                  onChange={(e) => {
                    setUser((prevUser) => {
                      return {
                        ...prevUser,
                        [e.target.id]: e.target.value.toLowerCase(),
                      };
                    });
                  }}
                />
              </div>

              <button className="btn btn-secondary" onClick={createAccount}>
                <p>Create Account</p>
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

            <div className="alert alert-primary mt-2 font-1">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="size-6"
              >
                <path
                  fillRule="evenodd"
                  d="M9.401 3.003c1.155-2 4.043-2 5.197 0l7.355 12.748c1.154 2-.29 4.5-2.599 4.5H4.645c-2.309 0-3.752-2.5-2.598-4.5L9.4 3.003ZM12 8.25a.75.75 0 0 1 .75.75v3.75a.75.75 0 0 1-1.5 0V9a.75.75 0 0 1 .75-.75Zm0 8.25a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5Z"
                  clipRule="evenodd"
                />
              </svg>

              <p className="">
                The email in which this signup code was sent to is registered
                with the account. If this isn't the email you intend to signup
                with, contact your administrator.
              </p>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
}
