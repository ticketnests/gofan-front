import { useEffect, useState } from "react";
import { Scanner } from "@yudiel/react-qr-scanner";
import callApi from "../../functions/functions";
import Notif from "../../components/Notif";
import ScannedUser from "../../components/ScannedUser";
import Loading from "../../components/Loading";
import Navbar from "../../components/Navbar";
import type { Timeout, NotifType, User, ScannedPerson } from "../../types"
let timeout: Timeout;
import { Link } from "react-router-dom";


interface CurrentEvent {
    id: string;
    name: string;
}

export default function ScanUser() {
  const [notif, setNotif] = useState<NotifType>({
    type: "err",
    message: "",
  });
  const [scannedContent, setScannedContent] = useState<string | null>(null);

  const [currentEvent, setCurrentEvent] = useState<CurrentEvent>({ id: "", name: "" });
  const [hasEvent, setHasEvent] = useState<boolean>(true);
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const storedUser = sessionStorage.getItem("user");

    if (storedUser) {
      setUser(JSON.parse(storedUser));
      if (JSON.parse(storedUser).events?.length > 0) {
        setCurrentEvent({
          id: JSON.parse(storedUser).events[0].id,
          name: JSON.parse(storedUser).events[0].name,
        });
      } else {
        setHasEvent(false);
        // window.location.replace("/adminDashboard")
      }
    } else {
      window.location.replace("/login");
    }
  }, []);

  const [scannedPerson, setScannedPerson] = useState<ScannedPerson | null>(null);
  useEffect(() => {
    timeout = setTimeout(() => {
      setNotif({ type: "err", message: "" });
    }, 5000);

    return () => {
      clearTimeout(timeout);
    };
  }, [notif]);

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (scannedContent !== null) {
      setLoading(true);
      const body = {
        uuid: scannedContent,
        eventId: currentEvent.id,
      };
      console.log("body: ", body);
      callApi("/scanUser", "POST", body).then((res) => {
        if (res.code === "ok") {
          console.log("am i right fellas");
          setScannedPerson(JSON.parse(res.message));
        } else if (res.code === "err") {
          console.log("sdf");
          setNotif({ type: "err", message: "Ticket Not Found or invalid" });
          setScannedContent(null);
        } else {
          console.log("tjhsi");
          setNotif({ type: "err", message: "Ticket Not Found or invalid" });
          setScannedContent(null);
        }
        setLoading(false);
      });
    } else {
      // do nothing
    }
  }, [scannedContent]);

  return (
    <section>
      <Navbar />
      {loading && <Loading />}

      {!hasEvent ? (
        <>
          <div className="w-2/6 text-center mx-auto flex flex-col gap-3 font-1">
            <div className="w-full mt-3 bg-base-200  p-4 border rounded-lg">
              <p className="text-xl font-bold">No Active Events Found</p>
              <p>You must have an active event to scan</p>
              <button className="btn btn-primary mt-3">
                <Link to="/admin/adminDashboard">Go to Dashboard</Link>
              </button>
            </div>
          </div>
        </>
      ) : (
        <>
          {scannedPerson !== null ? (
            <>
              <ScannedUser
                user={scannedPerson}
                setUser={setScannedPerson}
                setScannedContent={setScannedContent}
              />
            </>
          ) : (
            <>
              {notif.message !== "" && (
                <Notif type={notif.type} message={notif.message} />
              )}

              <div className="mx-auto w-fit border mt-4 p-4 border-primary font-1 rounded-box border-dashed">
                <div className="w-96 h-96 max-h-screen mx-auto max-w-screen">
                  <p className="text-sm">You are currently scanning</p>
                  <Scanner
                    onScan={(result: any) => {
                      setScannedContent(result[0].rawValue);
                      console.log("this was called");
                    }}
                    classNames={"rounded-box"}
                  />
                </div>
                {/* <div className="flex flex-row p-3 flex-wrap gap-4 items-center font-semibold">
  <div>
    <p>ID Scanned:</p>
  </div>
  <div className="loading loading-spinner">
    
  </div>

</div> */}

                {user && user !== null && user.name ? (
                  <>
                    <div className="p-3 border rounded-box mt-2">
                      <p className="font-bold">Hello {user.name}!</p>
                      {/* I haven't tested if this will work */}
                      <select
                        value={currentEvent.id}
                        onChange={(e) => {
                          console.log("this here", e);

                          let index = 0;
                          if (user&&user.events) {
                            for (const thing of user.events) {
                                // use "of" if user.events is an array
                                if (thing.id === e.target.value) {
                                  break;
                                } else {
                                  index++;
                                }
                              }
    
                              console.log(index);
    
                              setCurrentEvent({
                                id: e.target.value,
                                name: user.events[index].name,
                              });
                          }
                          
                        }}
                        className="select mt-2"
                      >
                        {user?.events?.map((event, i) => (
                          <option key={i} id={String(i)} value={event.id}>
                            {event.name}
                          </option>
                        ))}
                      </select>
                    </div>
                  </>
                ) : (
                  <></>
                )}
                <div></div>
              </div>
            </>
          )}
        </>
      )}
    </section>
  );
}
