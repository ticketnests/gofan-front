import { useState, useEffect } from "react"
import Footer from "../components/Footer"
// import Navbar from "../components/Navbar"
// import Search from "../components/"
import callApi, {formatString, isPassword, isEmail} from "../functions/functions"
import type { SearchResult, ResType, NotifType, Timeout } from "../types"
import { CheckCircleIcon } from "@heroicons/react/24/outline";
import { Link } from "react-router-dom"
import Notif from "../components/Notif"
// import { useNavigate } from 'react-router-dom';
// email, name, schoolParent, schoolAddress, password, categoryId
interface AdminUser {
    email: string;
    password: string;
    name: string;
    schoolParent: string | null;
    schoolAddress: string;
    confirmPassword: string;
    categoryId: string | null;
    isSchoolAccount: boolean;



}
let timeout: Timeout;
export default function AdminRegister() {
    // const navigate = useNavigate();
    // const [isPartOfSchool, setIsPartOfSchool] = useState<boolean>(false);
    const [newUser, setNewUser] = useState<AdminUser>({
        isSchoolAccount: false,
        email: "",
        password: "",
        confirmPassword: "",
        categoryId: "N/A",
        schoolParent: "N/A",
        schoolAddress: "N/A",
        name: "",
    })
    const [searchResults, setSearchResults] = useState<SearchResult[] | []>([])
    const [loading, setLoading] = useState(false);
    const [query, setQuery] = useState("");
    
  const [notif, setNotif] = useState<NotifType>({
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

    const [estimate, setEstimate] = useState({
        ticketsSold: "40",
        ticketPrice: "100",
    })
    const findMostRelevant = () => {
        if (query && query.length > 0) {
        setLoading(true);

        callApi("/schoolSearch", "POST", { query: query.toLowerCase(), schoolOnly: true }).then(
            (res: ResType) => {
                if (res.code === "err") {
                    setSearchResults([]);
                } else if (res.code === "ok") {
                 
                    setSearchResults(JSON.parse(res.message));
                } else {
                    setSearchResults([]);
                }
                setLoading(false);
            }
        );
        }
    };
    
    useEffect(() => {
        if (query.length%3==0) {
            findMostRelevant();
        }


    }, [query])


    const selectSchool = (i: number) => {
        setNewUser((prevUser) => {

            return {...prevUser, categoryId: searchResults[i].categoryId, schoolParent: searchResults[i].schoolName}
            
        })

    }

    const handleSubmit = () => {

    // Lets do validation


    // email: string;
    // password: string;
    // name: string;
    // schoolParent: string | null;
    // schoolAddress: string;
    // confirmPassword: string;
    // categoryId: string | null;
    // isSchoolAccount: boolean;
    if (!isEmail(newUser.email)) {
        setNotif({type: "err", message: "Enter a valid email"});
        return;
    } else if (newUser.password!==newUser.confirmPassword) {
        setNotif({type: "err", message: "Passwords don't match"});
        return;
    } else if (!isPassword(newUser.password)) {
        setNotif({type: "err", message: "Password isn't valid"});
        return;
    } else if (!newUser.schoolAddress&&!newUser.schoolParent&&!newUser.categoryId) {
        setNotif({type: "err", message: "Your address or overlying school is invalid"});
        return;
    }


    setLoading(true)
    callApi("/createschool", "POST", newUser).then((res: ResType) => {
        if (res.code==="err") {
            setNotif({type: "err", message: "Something went wrong"})
        } else if (res.code==="ok") {
            window.location.replace('/admin/dashboard')
            // navigate("/admin/dashboard")
            setNotif({type: "success", message: "Success"})
            
        } else {
            setNotif({type: "err", message: "Something went wrong"})
        }
        setLoading(false);
    })





        

        

    }


    return (
        <>

        

        <section className="font-1 min-h-screen grid grid-row-reverse sm:grid-cols-2 gap-2 items-center justify-items-center  h-full w-full ">
            <div className="order-last sm:w-2/6 w-full mx-auto">
                {notif.message !== "" && (
                      <Notif type={notif.type} message={notif.message} />
                    )}
                <p className="font-bold font-1 text-2xl mb-4 text-center">Make tickets<br/>easy without the fees</p>

                <p className="text-center mb-4 font-1 text-sm">No Credit Card Required</p>
                <div className="w-full p-3 bg-base-300">
           
                    
                    <form onSubmit={(e) => { e.preventDefault(); handleSubmit()}} className="flex flex-col w-full gap-2 mx-auto">

                    <div>    <input required minLength={4} maxLength={40} className="input validator input-secondary w-full" value={newUser.name} onChange={(e) => {
                            setNewUser((prev) => {
                                // Only update if no spaces, otherwise keep previous value
                                if (!e.target.value.includes(" ")) {
                                    return { ...prev, name: String(e.target.value) };
                                }
                                return prev;
                            })
                        }} placeholder="Visible Name:" />
                        <p className="validator-hint hidden">Enter a valid username</p>

                        </div>
                        <div>    <input required type="email" minLength={4} maxLength={40} className="input validator input-secondary w-full" value={newUser.email} onChange={(e) => {
                            setNewUser((prev) => {
                                return {...prev, email: String(e.target.value)}
                            })
                        }} placeholder="Email:" />
                        <p className="validator-hint hidden">Enter a valid email address</p>

                        </div>
                        <div>
                        <input required minLength={4} maxLength={15} type="password" className="input validator input-primary w-full" value={newUser.password} placeholder="Password" onChange={(e) => {
                            setNewUser((prev) => {
                                return {...prev, password: String(e.target.value)}
                            })
                        }}  />
                        <p className="validator-hint hidden">Enter a password between 4-15 characters long</p>
                        </div>
                       

                        <div>

                        
                        <input type="password" required minLength={4} maxLength={15} className="input input-accent validator w-full" value={newUser.confirmPassword} placeholder="Confirm Password" onChange={(e) => {
                            setNewUser((prev) => {
                                return {...prev, confirmPassword: String(e.target.value)}
                            })
                        }}  />
                        <p className="validator-hint hidden">Enter a password between 4-15 characters long</p>
                        </div>

                        <div className="flex flex-row gap-2">
                            <input type="checkbox" checked={newUser.isSchoolAccount} onChange={() => setNewUser((prev) => {
                                return {...prev, isSchoolAccount: !prev.isSchoolAccount}
                            })} className="checkbox" />
                            <p>School Account</p>
                        </div>

                        {(newUser.isSchoolAccount) ? <>
                            <div className="p-2 bg-base-100 ">
                                <p className="mb-2">What school do you partain to?</p>
                                {newUser.categoryId=="N/A"&&newUser.schoolParent=="N/A" ? <>
                                    <input type="text" value={query} onChange={(e) => setQuery(String(e.target.value))} className="input" placeholder="School Name:" />
                                <div className="flex flex-col gap-2 mt-2 w-full max-h-30 overflow-y-auto bg-base-300">
                                    {searchResults&&searchResults.length>0 ? <>
                                        {searchResults.map((result, i) => (
                    <div
                      onClick={() => selectSchool(i)}
                      key={i}
                      className="flex items-center gap-4 p-3 hover:bg-base-300 transition-all rounded-box cursor-pointer"
                    >
                      <div className="p-2">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 24 24"
                          fill="currentColor"
                          className="size-6 text-primary"
                        >
                          <path d="M11.584 2.376a.75.75 0 0 1 .832 0l9 6a.75.75 0 1 1-.832 1.248L12 3.901 3.416 9.624a.75.75 0 0 1-.832-1.248l9-6Z" />
                          <path
                            fillRule="evenodd"
                            d="M20.25 10.332v9.918H21a.75.75 0 0 1 0 1.5H3a.75.75 0 0 1 0-1.5h.75v-9.918a.75.75 0 0 1 .634-.74A49.109 49.109 0 0 1 12 9c2.59 0 5.134.202 7.616.592a.75.75 0 0 1 .634.74Zm-7.5 2.418a.75.75 0 0 0-1.5 0v6.75a.75.75 0 0 0 1.5 0v-6.75Zm3-.75a.75.75 0 0 1 .75.75v6.75a.75.75 0 0 1-1.5 0v-6.75a.75.75 0 0 1 .75-.75ZM9 12.75a.75.75 0 0 0-1.5 0v6.75a.75.75 0 0 0 1.5 0v-6.75Z"
                            clipRule="evenodd"
                          />
                          <path d="M12 7.875a1.125 1.125 0 1 0 0-2.25 1.125 1.125 0 0 0 0 2.25Z" />
                        </svg>
                      </div>
                      <div className="text-left font-1">
                        <p className="text-base font-medium">
                          {formatString(result.schoolName)}
                        </p>
                      </div>
                    </div>
                  ))}

                                    </> : <>
                                    
                                    </>}

                                </div>
                                </> : <>
                                
                                <div className="bg-base-300 p-2 flex flex-col gap-2">
                                
                                    <div className="badge badge-outline badge-primary">Parent Organization</div>
                                    <div>
                                    <p className="text-xs font-1">Id: {newUser?.categoryId}</p>
                                        
                                        <p className="font-bold">{newUser.schoolParent ? formatString(newUser.schoolParent): "N/A"}</p>
                                        
                                    </div>

                                </div>

                                </>}
                             
                            </div>

                            <div className="p-2 bg-base-100">
                                <p className=" mb-1">School Address</p>
                                <div>
                                <input type="text" required minLength={2} maxLength={100} className="input validator" value={newUser.schoolAddress} onChange={(e) => {
                                    setNewUser((prevUser) => ({
                                        ...prevUser, schoolAddress: e.target.value
                                    }) )
                                }} placeholder="Address:" />
                                <p className="validator-hint hidden">Enter a real school address</p>

                                </div>
                               
                                
                            </div>
                            

                        </> : <>
                     
                        </>}     
                        
                        {(loading) ? <>
                            <button disabled type="submit" className="btn btn-primary btn-disabled">
                            <p>Create Account</p>

                        </button>
                        </> : <>
                        <button type="submit" onClick={handleSubmit} className="btn btn-primary">
                            <p>Create Account</p>

                        </button>
                        </>}
                 

                    </form>
                



                </div>
               
                
            </div>
                 <div className="w-full h-full bg-base-200">         
            <div className="sm:w-4/6 w-full mx-auto h-full p-4">
                <Link to="/landing" className="btn btn-secondary font-1 font-bold btn-outline">
                ticketnest

                </Link>
                <p className="text-xs mt-1">Event Ticketing Done Right</p>
                <div>
                    <p className="font-1 font-bold text-5xl"></p>
                </div>
                <div className="mt-8">
                
                
                
                <div className="">
                    <p className="font-1 font-bold text-3xl text-left">
                    <span className="text-accent">50%</span> Cheaper. <span className="text-accent">100%</span> Ready for Your Next Event.<br/>
                    
                    
                    </p>
                    <p className="font-1 font-semibold text-xl mt-2">TicketNest makes event ticketing simple, powerful, and budget-friendly.</p>
                </div>

                    
                </div>

                
                <div className="border border-success rounded-box mt-2 p-4 gap-4 grid sm:grid-cols-2 items-center ">
                <div className="gap-2  flex flex-col items-center  rounded-box">

<p className="font-1 font-bold text-lg">Calculate your earnings</p>
<label className="input w-fit">
    <p className="font-1 font-extrabold">$</p>
<input type="number" value={estimate.ticketPrice} onChange={(e) => {
    setEstimate((prev) => {
        return {...prev, ticketPrice: e.target.value}
    })
}} className=" w-full " placeholder="Ticket Price" />
</label>


<input type="range" max="100000" min="1" className="range" value={Number(estimate.ticketsSold)} onChange={(e) => {
    setEstimate((prev) => {
        console.log(e.target.value);
        return {...prev, ticketsSold: e.target.value}
    })
}} />
<p className="text-sm font-1 mt-2"><span className="p-2 bg-error text-error-content font-1 font-bold">{estimate.ticketsSold}</span> Tickets Sold</p>

</div>

<div>

<div className="bg-success text-success-content p-3 rounded-box">
              <p className="font-bold">Estimated Revenue Boost</p>
              <p className="text-2xl font-extrabold">$
                {(
                  (Number(estimate.ticketPrice) <= 5
                    ? Number(estimate.ticketsSold)
                    : Number(estimate.ticketsSold) + Number(estimate.ticketsSold) * Number(estimate.ticketPrice)* 0.05
                  ) 
                  - (
                    (Number(estimate.ticketsSold) * Number(estimate.ticketPrice)) * 0.029
                    + Number(estimate.ticketsSold) * 0.3
                  )
                ).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
              </p>
              <p className="text-sm">
                Compared to our competitors
              </p>
            </div>



</div>
                </div>    
                


                <div className="">
                    
                <div className=" mt-4 w-full">

<p>Don't believe us? Look at our competitors</p>
<div className="w-full mt-2 bg-base-300">

<table className="table"> 
{/* head */}
<thead>
<tr>
<th>Company</th>
<th>Ease of use</th>
<th>Fees</th>

</tr>
</thead>
<tbody>
{/* row 1 */}
<tr className="opacity-75">

<td>Gofan</td>
<td><CheckCircleIcon className="size-6 text-success" /></td>
<td className="text-error">$1 minimum</td>
</tr>
{/* row 2 */}
<tr className="opacity-75">

<td>EventBrite</td>
<td><CheckCircleIcon className="size-6 text-success" /></td>
<td className="text-error">$1.79 minimum</td>
</tr>
{/* row 3 */}
<tr className="opacity-75">

<td>HomeTown ticketing</td>
<td><CheckCircleIcon className="size-6 text-success" /></td>
<td className="text-error">$1.30 minimum</td>
</tr>
<tr className="bg-success text-success-content">

<td>ticketnest</td>
<td><CheckCircleIcon className="size-6" /></td>
<td className="">$0.2 + <a href="https://stripe.com/pricing" className="link">Processing Fees</a></td>
</tr>
</tbody>
</table>

</div>
</div>
                  
                </div>

 

            </div>
            </div>      



        </section>



        <Footer />



        
        </>
    )

}