import Footer from "../components/Footer"
import Navbar from "../components/Navbar"
import { CheckCircleIcon, TicketIcon, BanknotesIcon } from "@heroicons/react/24/outline";
import { Link } from "react-router-dom";

export default function LandingPage() {


    return (
        <>
        <Navbar />


        <div className="hero min-h-[90vh] bg-gradient-to-b from-base-300 to-base-100">
            <div className="hero-content text-center">

       

                <div className="font-1 max-w-md">
                    <div className="badge badge-primary font-1 font-bold text-lg">
                        <p>Welcome to ticketnest</p>
                    </div>
                    <h1 className="md:text-7xl text-5xl  font-bold">What are you organizing?</h1>
                    <p className="py-6 font-semibold text-lg">Ticketnest handles everything from accounting to ticket management.</p>
                    <Link to="/adminregister" className="btn btn-secondary btn-lg">Get started for free</Link>
                </div>

               
            </div>
        </div>
        
        
        <div className="flex flex-col w-full font-1 bg-base-300 p-10 gap-2 min-h-[50vh]">
        <div className="flex sm:flex-row flex-col w-full gap-4">
          <div className="">
            <p className="font-1 font-bold text-2xl">
              {" "}
              Ticketing services charge up to{" "}
              <span className="text-error">
                25% of the ticket price per transaction
              </span>{" "}
              <br /> on average
            </p>
            {/* <a
              href="https://gofan.playonsports.com/gofan-pricing24"
              className="text-xs"
            >
              Source:{" "}
              <span className="underline underline-offset-2">
                GoFan Pricing
              </span>
            </a> */}

            <p className="mt-2">
              You're losing out on{" "}
              <span className="font-extrabold text-error">
                tens of thousands yearly.
              </span>
            </p>
            <div className="mt-2 bg-base-100 p-3 rounded-box">
              <p className="font-bold">
                This is money that could have gone to:
              </p>
              <ul className="list-disc ml-5">
                <li>Funding the event</li>
                <li>Income</li>
                <li>Higher quality experience</li>
                {/* <li>Less strain on the budget</li>
                <li>School-provided athletic scholarships</li> */}
              </ul>
            </div>
          </div>

          <div className="w-full">
            <div className="h-96 rounded-box w-full min-h-full">
            <div className="w-full border-2 dark:border-gray-700 rounded-box overflow-y-auto max-h-[70vh] xl:max-h-[85vh] p-3">
                <div className="overflow-x-auto">
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
        <div className="sm:w-3/6 mx-auto bg-base-100 text-center p-4 rounded-box">
            <p className="font-1 font-bold text-lg">Ticketnest handles everything at a fraction of the cost</p>
        </div>
      </div>


      <div className="font-2 p-5 bg-base-100 py-10 text gap-5 grid sm:grid-cols-3 grid-cols-1 items-center">
        <div className="bg-base-300 p-4 rounded-box">
          <div className="text-center">
            <p className=" font-bold text-4xl">Say goodbye to huge fees</p>

            <p>
              Ticketnest charges a flat fee of $0.20 per ticket, plus Stripe's
              processing fees.
            </p>
          </div>

          <div className="mt-2 bg-base-100 p-3 rounded-box">
            <p className="font-bold">This means:</p>
            <ul className="list-disc ml-5">
              <li>More revenue</li>
              <li>Earn more on expensive tickets</li>
              <li>and more...</li>
            </ul>
          </div>
          <p className="mt-2 text-center">
            Who likes paying more than they have to?
          </p>
        </div>

        <div className="bg-base-300 p-4 rounded-box">
          <div className="text-center">
            <p className=" font-bold text-4xl">Accounting made easy</p>

            <p>
              Ticketnest provides invoices and detailed reports of event
              financials
            </p>
          </div>

          <div className="mt-2 bg-base-100 p-3 rounded-box">
            <p className="font-bold">This means:</p>
            <ul className="list-disc ml-5">
              <li>Weekly summarizes and checks</li>
              <li>Attendee list</li>
              <li>Purchase amounts</li>
            </ul>
          </div>
          <p className="mt-2 text-center">Don't worry, we got you covered.</p>
        </div>
        <div className="bg-base-300 p-4 rounded-box">
          <div className="text-center">
            <p className=" font-bold text-4xl">Built for you</p>

            <p>
              Ticketnest uses feedback to make our product better for you
            </p>
          </div>

          <div className="mt-2 bg-base-100 p-3 rounded-box">
            <p className="font-bold">This means:</p>
            <ul className="list-disc ml-5">
              <li>More personalized and catered</li>
              <li>Faster development times</li>
              <li>and more...</li>
            </ul>
          </div>
          <p className="mt-2 text-center">Ticketnest is built for you. Dont believe us? Let's <a className="link" href="mailto:contact@ticketnest.us">talk</a></p>
        </div>
      </div>  

      <div className="min-h-[50vh] bg-base-200 grid md:grid-cols-2 font-1  p-10 gap-5 items-center justify-items-center">
        <div className="">

          <p className="text-5xl font-1 font-bold max-w-md">Handle events without killing your revenue</p>
      
          <Link to="/adminregister" className="btn btn-primary mt-4 btn-outline">Make events now</Link>

        </div>

        <div className="md:flex hidden flex-row gap-2">
            {Array(2).fill("").map((_,i) => (
              <TicketIcon key={i} className="size-48" />
            ))}
            <BanknotesIcon className="size-48" />
            

        </div>
        
      </div>     


        <Footer />

        
        
        </>
    )
}