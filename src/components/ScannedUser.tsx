import React, {useState, useEffect} from "react";
import { formatString } from "../functions/functions.ts";
import type { ScannedPerson } from "../types.ts";


interface Props {
    user: ScannedPerson;
    setUser: React.Dispatch<React.SetStateAction<ScannedPerson | null>>;
    setScannedContent: React.Dispatch<React.SetStateAction<any>>;
}



export default function ScannedUser(props: Props) {
    const [user, setUser] = useState<ScannedPerson | null>(null);
    useEffect(() => {

        if (props.user !== null) {
            setUser(props.user)
        }

        



    },[props.user])




    return (


        <>
        {(user !== null) && (
            <>

            <div className="bg-base-300 p-5 ">
                <div onClick={() => {props.setUser(null); props.setScannedContent(null)}} className="flex select-none cursor-pointer flex-row gap-3 items-center font-1 ">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-6">
  <path fillRule="evenodd" d="M7.28 7.72a.75.75 0 0 1 0 1.06l-2.47 2.47H21a.75.75 0 0 1 0 1.5H4.81l2.47 2.47a.75.75 0 1 1-1.06 1.06l-3.75-3.75a.75.75 0 0 1 0-1.06l3.75-3.75a.75.75 0 0 1 1.06 0Z" clipRule="evenodd" />
</svg> <p>Go back</p>



                </div>
          



            </div>

            <div className="sm:w-3/6 px-3  pt-3 sm:mx-auto mx-2 font-1 mt-4 border-2 rounded-box">
                <p className="text-sm mb-2">ID: {user.uuid}</p>
                <p className="font-bold">{formatString(user.name)}</p>

                <div className="divider"></div>

                <div className="mt-2">
                    <p className="font-1 font-bold">Tickets:</p>


                    <div className="p-3 rounded-box bg-base-100 my-2 flex flex-col gap-1 border-2 border-dashed border-success">
                        <p className="text-xs">Ticket Id: {user.ticket.ticketId}</p>
                        
                        <div className="badge badge-success badge-outline">{user.ticket.isActive ? "Active" : "Already used"}</div>
                      
                        <p className="font-semibold text-lg">{user.ticket.name}</p>
                       

                        <button className="btn btn-primary btn-disabled w-fit ">
                            Ticket Used<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-6">
  <path fillRule="evenodd" d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12Zm13.36-1.814a.75.75 0 1 0-1.22-.872l-3.236 4.53L9.53 12.22a.75.75 0 0 0-1.06 1.06l2.25 2.25a.75.75 0 0 0 1.14-.094l3.75-5.25Z" clipRule="evenodd" />
</svg>


                        </button>

                    </div>

                
                </div>
                
                


            </div>
            </>
           
        )}

        
        
        
        </>
    )
}