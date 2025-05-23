import { useState, useEffect } from "react"; 
import Navbar from "../components/Navbar";
import Footer from "../components/Footer"
import callApi from "../functions/functions";
import Notif from "../components/Notif"
import { Link } from "react-router-dom";
import type { NotifType, Timeout, User } from "../types";
import useSession from "../functions/auth"

let timeout: Timeout;
export default function Settings() {
    const [user, setUser] = useState<User | null>(null)
    // const [loading, setLoading] = useState(false);
    const [connectLink, setConnectLink] = useState(null);
    useEffect(() => {

        function x() {
            const savedUser = useSession()
            setUser(savedUser)
    
            if (savedUser === null) {
                window.location.replace("/login")
            } else {
                if (savedUser.isAdmin) {
                    
                    callApi("/createConnectLink", "GET", null).then((res) => {
                        if (res.code === "ok") {
                            setConnectLink(JSON.parse(res.message).url)
                        } else {
                            setConnectLink(null)
                        }
            
            
                    })
    
    
                }
            }
        }

        x()
        
       

        

    },[])
      const [notif, setNotif] = useState<NotifType>({
                       type: "err",
                       message: ""
         })

          useEffect(() => {
                       timeout = setTimeout(() => {
                           setNotif({type: "err", message: ''})
                       }, 5000)
           
                       return () => {
                           clearTimeout(timeout)
                       }
           
           
           
           
                   },[notif])

    const deleteUser = () => {

        // setLoading(true);


        callApi("/deleteAccount", "GET", null).then((res) => {
            if (res.code === "err")  {

                setNotif({type: "err", message: "Something went wrong"})
            } else if (res.code === "ok") {
                setNotif({type: "success", message: JSON.parse(res.message).message})
            } else {
                setNotif({type: "err", message: "Something went wrong"})
            }




        })

    




    }


    



    const logOut = () => {


        callApi("/signout", "GET", null).then((res) => {
            if (res.code === 'ok') {
                sessionStorage.removeItem("user");
            

            } else if (res.code === "err") {
                console.log(res);
                
            }
            window.location.replace("/");
        }) 

    }

    return (
        <>
        <div className="min-h-screen">


       


        <Navbar />
        {(user&&user.isAdmin) && (
            <div className="p-3 font-1 bg-base-200 select-none">
                <Link to='/admin/admindashboard' className="flex flex-row gap-2">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
  <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 15.75 3 12m0 0 3.75-3.75M3 12h18" />
</svg>
<p>Go back to Admin Dashboard</p>
                </Link>
                
            
                
            </div>
        )}
        {(user !== null) && (
                   <div className="my-4 font-1 sm:w-3/6 w-5/6 border-2 sm:p-4 p-2  rounded-box mx-auto bg-base-100">

                   <div className="p-3">
                       <p className="font-bold">Personal Information</p>
                        <p>View what ticketnest collects on you and account management.</p>
                        <div className="flex sm:flex-row flex-wrap flex-col sm:p-0 gap-4 mt-4">

                        <div className=" w-full">
                        <fieldset className="fieldset">
  <legend className="fieldset-legend">Name</legend>
  <input type="text" className="input" placeholder="Type here" value={user.name} disabled />
  <p className="fieldset-label text-error">Required</p>
</fieldset>
                     
                       </div>
                       <div className=" w-full">
                        <fieldset className="fieldset">
  <legend className="fieldset-legend">Email</legend>
  <input type="text" className="input" placeholder="Type here" value={user.email} disabled />
  <p className="fieldset-label text-error">Required</p>
</fieldset>
                     
                       </div>
        

                        </div>

                        {(user.isAdmin) && (

<div className="bg-base-300 my-5 p-3 text-base-content font-1 rounded-box border border-error">
<p className="text text-error">Required</p>

{(!user.hasVerified) ? (
    <p>To finalize your account, please link your bank details to allow for payment processing.</p>
) : <>
<p>Your account is already approved for payouts. Check or change your payout information here.</p>
</>}

{connectLink===null ? <>
<div className="w-40 mt-2 h-10 bg-base-200 skeleton">

</div>
</> : <>
<Link to={connectLink} className="btn btn-error mt-2 btn-sm">Finalize Account</Link>
</>}


</div>
                        )}
                       

                        <div className="font-1 p-3 mt-2  rounded-box">
                            <p className="font-bold">Account Actions</p>

                        <div className="flex flex-col gap-2">


                        <div className="mt-3 font-1">
                            <button className="btn btn-error btn-outline" onClick={logOut}>
                                Log out<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-6">
  <path fillRule="evenodd" d="M7.5 3.75A1.5 1.5 0 0 0 6 5.25v13.5a1.5 1.5 0 0 0 1.5 1.5h6a1.5 1.5 0 0 0 1.5-1.5V15a.75.75 0 0 1 1.5 0v3.75a3 3 0 0 1-3 3h-6a3 3 0 0 1-3-3V5.25a3 3 0 0 1 3-3h6a3 3 0 0 1 3 3V9A.75.75 0 0 1 15 9V5.25a1.5 1.5 0 0 0-1.5-1.5h-6Zm10.72 4.72a.75.75 0 0 1 1.06 0l3 3a.75.75 0 0 1 0 1.06l-3 3a.75.75 0 1 1-1.06-1.06l1.72-1.72H9a.75.75 0 0 1 0-1.5h10.94l-1.72-1.72a.75.75 0 0 1 0-1.06Z" clipRule="evenodd" />
</svg>

                            </button>
                        </div>

                        <div className=" mt-1 w-full rounded-box">
                        
                       <button
                         className="btn btn-error"
                         onClick={() => {
                           const dialog = document.getElementById("my_modal_1") as HTMLDialogElement | null;
                           if (dialog && typeof dialog.showModal === "function") {
                             dialog.showModal();
                           }
                         }}
                       >
                         Delete Account
                       </button>
<dialog id="my_modal_1" className="modal">
  <div className="modal-box border-2 border-error">
    {(notif.message!=="") && (
        <div className="mb-2">
            <Notif type={notif.type} message={notif.message} />
        </div>
    )}
    
    <h3 className="font-bold text-lg">Are you sure?</h3>
    <p className="py-4">Deleting your account will remove all your tickets and information regarding your account</p>

    <div className="alert alert-error alert-dash mb-2">
        <span>
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-6">
  <path fillRule="evenodd" d="M9.401 3.003c1.155-2 4.043-2 5.197 0l7.355 12.748c1.154 2-.29 4.5-2.599 4.5H4.645c-2.309 0-3.752-2.5-2.598-4.5L9.4 3.003ZM12 8.25a.75.75 0 0 1 .75.75v3.75a.75.75 0 0 1-1.5 0V9a.75.75 0 0 1 .75-.75Zm0 8.25a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5Z" clipRule="evenodd" />
</svg>


        </span>

        <p>Once you click to delete your account, you will have 14 days to reverse this action.</p>
    </div>
    <div className="flex flex-row gap-2">
    <form method="dialog">
        {/* if there is a button in form, it will close the modal */}
        <button className="btn btn-primary">
Go back
        </button>

      </form>
      <button className="btn btn-outline" onClick={deleteUser}>Delete Account</button>
        
       
    

    </div>
    
   
  </div>
</dialog>

<div role="alert" className="alert alert-error alert-dash mt-2">
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-6">
<path fillRule="evenodd" d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12Zm8.706-1.442c1.146-.573 2.437.463 2.126 1.706l-.709 2.836.042-.02a.75.75 0 0 1 .67 1.34l-.04.022c-1.147.573-2.438-.463-2.127-1.706l.71-2.836-.042.02a.75.75 0 1 1-.671-1.34l.041-.022ZM12 9a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5Z" clipRule="evenodd" />
</svg>
<span>This action deletes your account and account activity.</span>
</div>


                    </div>


                   

                        </div>
                          

                            
                        </div>
                       
                   </div>
       
               </div>
        )}
        </div>
     
     

        <Footer />


        
        
        
        
        
        </>
    )
}