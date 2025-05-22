import React, { useEffect, useState, useRef } from "react";
import QRCodeWithEffect from "./QRcode";
import callApi from "../functions/functions";

// The qr code will just be a qr code representing the current user's uuid.


interface Props {
    ticketId: string | undefined;
    setShowTicket: React.Dispatch<React.SetStateAction<number | null>>;
}

export default function ShowTicket(props: Props) {
  const modalBox = useRef< Ref<HTMLDialogElement> | undefined>(undefined);
  const [qrCode, setQrCode] = useState(
    "https://docs.lightburnsoftware.com/legacy/img/QRCode/ExampleCode.png"
  );
  const [loading, setLoading] = useState(false);
  const handleClose = () => {
    console.log("The close has occured");
    props.setShowTicket(null);
  };
  useEffect(() => {
    if (modalBox.current&&props.ticketId!==undefined) {
      modalBox.current.showModal();
      setLoading(true);

      console.log("this is the pro");
      callApi("/generateQRCODE", "POST", { ticketId: props.ticketId }).then(
        (res) => {
          if (res.code === "ok") {
            console.log(JSON.parse(res.message).img);
            setQrCode(JSON.parse(res.message).img);
            setLoading(false);
          }
        }
      );

      modalBox.current.addEventListener("close", handleClose);

      return () => {
        modalBox.current?.removeEventListener("close", handleClose);
      };
    }
  }, [props.ticketId]);

  return (
    <>
      <dialog ref={modalBox} id="my_modal_1" className="modal modal-center">
        <div className="modal-box h-[95%]">
          <h3 className="font-bold text-2xl text-center font-1">Your Ticket</h3>
          <div className="">
            {loading ? (
              <>
                <div className="absolute z-20 top-0 left-0 w-full bg-black h-full p-4 opacity-90"></div>
                <div className="absolute top-[50%] z-30 translate-y-[-50%] left-[50%] translate-x-[-50%]">
                  <span className="loading text-primary loading-spinner size-20"></span>
                </div>
              </>
            ) : (
              <></>
            )}
            <div className="w-fit mx-auto">
              <QRCodeWithEffect href={qrCode} />
            </div>
          </div>

          <p className=" text-center font-1 font-bold">
            Your ticket is unique to your Student ID
          </p>
          <p className="text-center">Do not share this code with anyone</p>

          <form method="dialog">
            <div className="p-3 rounded-box my-4 w-fit mx-auto">
              <button className="btn btn-base btn-ghost">
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
                <p>Go Back</p>
              </button>
            </div>
          </form>
        </div>

        <form method="dialog" className="modal-backdrop">
          {/* if there is a button in form, it will close the modal */}
          <button>close</button>
        </form>
      </dialog>
    </>
  );
}
