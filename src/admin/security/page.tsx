import React, { useState, useEffect } from "react";
import callApi, { formatString } from "../../functions/functions";
import Loading from "../../components/Loading";
import Notif from "../../components/Notif";
import type {Timeout, ResType, Person} from "../../types"
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import AdminNav from "../../components/AdminNav";
let timeout: Timeout;




export default function Security() {
    const [email, setEmail] = useState("");
    const [security, setSecurity] = useState<Person[] | []>([]);
    const [notif, setNotif] = useState({ type: "err", message: "" });
    const [loading, setLoading] = useState(false);
    const [dashboardStats, setDashboardStats] = useState({ inactiveCount: 0 });

    useEffect(() => {
        timeout = setTimeout(() => {
            setNotif({ type: "err", message: "" });
        }, 5000);

        return () => {
            clearTimeout(timeout);
        };
    }, [notif]);

    useEffect(() => {
        setLoading(true);
        callApi("/getSecurity", "GET", null).then((res: ResType) => {
            if (res.code === "ok") {
                const newPeople = JSON.parse(res.message);
                let inactiveCount = 0;
                newPeople.forEach((person: Person) => {
                    if (person.name === null) {
                        inactiveCount++;
                    }
                });

                setDashboardStats({ inactiveCount });
                setSecurity(newPeople);
                setLoading(false);
            } else {
                window.location.replace("/login");
                setLoading(false);
            }
        });
    }, []);

    interface actionParams {
        hasCompleted: boolean;
        email: string;
        uuid: string | undefined;

    }


    const manageAction = (person: actionParams) => {
        const url = person.hasCompleted ? "/deleteSecurity" : "/sendSecurity";
        setLoading(true);
        const body = person.hasCompleted
            ? { uuid: person.uuid }
            : { email: person.email };

        callApi(url, "POST", body).then((res: ResType) => {
            if (res.code === "ok") {
                const message = person.hasCompleted
                    ? "Deleted security user"
                    : "Re-sent email";

                if (person.hasCompleted) {
                    setSecurity((prevSecurity) =>
                        prevSecurity.filter(
                            (prevSecurityItem: Person) =>
                                prevSecurityItem.uuid !== person.uuid
                        )
                    );
                }
                setNotif({ type: "success", message: "Successfully " + message });
            } else {
                setNotif({ type: "err", message: "Something went wrong" });
            }
            setLoading(false);
        });
    };

    return (
        <>
<section className="w-full h-full">
        <Navbar />

        <section className="w-full h-full flex flex-row">
          <AdminNav />
            
          {!loading ? (
                <div className="my-4 font-1 grid grid-cols-1 lg:grid-cols-3 gap-6 font-1">
                    <div className="lg:col-span-1 p-4 bg-base-300 rounded-box h-fit shadow-md">
                        <p className="font-bold text-lg">Manage Security</p>
                        {notif.message !== "" && (
                            <div className="mt-4">
                                <Notif type={notif.type} message={notif.message} />
                            </div>
                        )}
                        <div className="mt-6">
                            <p className="font-bold mb-2">Create a New Security</p>
                            <fieldset className="fieldset">
                                <legend className="fieldset-legend">Email</legend>
                                <input
                                    value={email}
                                    onChange={(e) =>
                                        setEmail(e.target.value.toLowerCase())
                                    }
                                    className="input w-full"
                                    placeholder="Enter email"
                                />
                            </fieldset>
                            <button
                                className="btn btn-primary mt-4 w-full"
                                onClick={() => {
                                    manageAction({
                                        hasCompleted: false,
                                        email: email,
                                        uuid: undefined
                                    });
                                    setEmail("");
                                }}
                            >
                                Send Email
                            </button>
                        </div>
                    </div>

                    <div className="lg:col-span-2 p-4 bg-base-200 rounded-box shadow-md">
                        <p className="font-bold text-lg">Security Users</p>
                        <div className="mt-4">
                            {dashboardStats.inactiveCount > 0 ? (
                                <p className="text-lg font-semibold">
                                    Over{" "}
                                    <span className="badge badge-warning">
                                        {dashboardStats.inactiveCount} emails
                                    </span>{" "}
                                    have not finished creating their accounts
                                </p>
                            ) : (
                                <p className="font-bold">
                                    Start by sending your first request
                                </p>
                            )}
                        </div>
                        <div className="flex flex-row flex-wrap gap-4 mt-6">
                            {security.length > 0 ? (
                                security.map((person, i) => (
                                    <div
                                        className="bg-base-100 p-4 rounded-box shadow-md flex flex-col gap-2"
                                        key={i}
                                    >
                                        <div
                                            className={`badge ${
                                                person.hasCompleted
                                                    ? "badge-success"
                                                    : "badge-error"
                                            }`}
                                        >
                                            {person.hasCompleted
                                                ? "Active"
                                                : "Inactive"}
                                        </div>
                                        {person.name && (
                                            <p className="font-bold">
                                                {formatString(person.name)}
                                            </p>
                                        )}
                                        <p>Email: {person.email.toLowerCase()}</p>
                                        <button
                                            className={`btn ${
                                                person.hasCompleted
                                                    ? "btn-error"
                                                    : "btn-warning"
                                            } w-full`}
                                            onClick={() => manageAction(person)}
                                        >
                                            {person.hasCompleted
                                                ? "Delete Account"
                                                : "Resend Email"}
                                        </button>
                                    </div>
                                ))
                            ) : (
                                <p className="text-center col-span-full">
                                    No security users found.
                                </p>
                            )}
                        </div>
                        <div className="mt-6">
                            <div className="alert alert-warning">
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
                                <p>
                                    People that aren't active have not completed
                                    the signup process available in their emails.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            ) : (
                <Loading />
            )}
        </section>
        
        <Footer />
        
      </section>


           
        </>
    );
}