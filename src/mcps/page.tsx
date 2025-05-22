import { useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { Helmet } from "react-helmet";
export default function Mcps() {
  const [tickets, setTickets] = useState(0);

  return (
    
    <section data-theme="retro" className="overflow-y-auto h-fit">
        <Helmet>
            <meta charSet="utf-8" />
            <title>Our Mission • ticketnest</title>
            <meta
      name="description"
      content={`At ticketnest, we understand the ticketing alternatives. Click here to read about how we plan to change the game.`}
    />
        </Helmet>
      <Navbar />

      <div className="hero min-h-[80vh] font-1">
        <div className="hero-content flex-col">
          <div className="text-center">
            <h1 className="text-6xl font-bold">Why use ticketnest?</h1>
            <p className="py-6">
              <span className="text-error font-extrabold text-lg">GoFan </span>
              works just fine, right?
            </p>
          </div>
        </div>
      </div>

      <div className="flex flex-col w-full font-1 bg-base-300 p-10 gap-2 min-h-[50vh]">
        <div className="flex sm:flex-row flex-col gap-4">
          <div>
            <p className="font-1 font-bold text-2xl">
              {" "}
              GoFan charges{" "}
              <span className="text-error">
                20% of the ticket price per transaction
              </span>{" "}
              <br /> on average
            </p>
            <a
              href="https://gofan.playonsports.com/gofan-pricing24"
              className="text-xs"
            >
              Source:{" "}
              <span className="underline underline-offset-2">
                GoFan Pricing
              </span>
            </a>

            <p className="mt-2">
              Your school loses out on{" "}
              <span className="font-extrabold text-error">
                tens of thousands yearly.
              </span>
            </p>
            <div className="mt-2 bg-base-100 p-3 rounded-box">
              <p className="font-bold">
                This is money that could have gone to:
              </p>
              <ul className="list-disc ml-5">
                <li>More Sports equipment</li>
                <li>Lower income participation in sports</li>
                <li>More coaches and coach assistants</li>
                <li>Less strain on the budget</li>
                <li>School-provided athletic scholarships</li>
              </ul>
            </div>
          </div>

          <div>
            <div className="h-96 rounded-box w-full min-h-full">
              <img
                className="w-full h-full rounded-box object-cover object-right sm:object-right overflow-hidden"
                src={"/assets/photoMCPS.png"}
                loading="lazy"
              />
            </div>
          </div>
        </div>
      </div>
      <div className="my-10 font-1">
        <div className="text-center">
          <p className="font-1 font-bold text-2xl">Estimated Loss Calculator</p>
          <p className="text-center">
            Find out how much your school loses each year
          </p>
        </div>

        <div className="w-5/6 mx-auto border-2  mt-4 rounded-box p-4">
          <div className="grid w-full lg:grid-cols-2 grid-cols-1 items-center justify-center gap-2">
            <div>
              <p className="sm:text-left text-center">
                Amount of tickets sold each year
              </p>

              <div className="w-full mt-3">
                <input
                  type="range"
                  min={0}
                  max="100000"
                  value={tickets}
                  onChange={(e) => setTickets(Number(e.target.value))}
                  className="range"
                  step="100"
                />
                <p className="text-left font-semibold">
                  {Number(tickets)} tickets sold
                </p>
              </div>
            </div>

            <div className="bg-error text-error-content p-3 rounded-box">
              <p className="font-bold">Estimated Yearly Loss</p>
              <p className="text-2xl font-extrabold">
                ${(tickets * 0.55).toLocaleString('en-US', {minimumFractionDigits: 2, maximumFractionDigits: 2})}
              </p>
              <p className="text-sm">
                This is money that could have gone to your school.
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="hero min-h-[40vh] bg-base-300 font-1">
        <div className="hero-content flex-col">
          <div className="text-center">
            <h1 className="text-5xl font-bold">We aren't just cheaper</h1>
            <p className="py-6">We're better too.</p>
          </div>
        </div>
      </div>

      <div className="font-2 p-5 bg-base-100 py-10 text gap-5 grid sm:grid-cols-3 grid-cols-1 items-center">
        <div className="bg-base-300 p-4 rounded-box">
          <div className="text-center">
            <p className=" font-bold text-4xl">Say goodbye to ID Checks</p>

            <p>
              With ticketnest, each ticket is <u>associated with a student</u>.
            </p>
          </div>

          <div className="mt-2 bg-base-100 p-3 rounded-box">
            <p className="font-bold">This means:</p>
            <ul className="list-disc ml-5">
              <li>Less time spent checking IDs</li>
              <li>Less time spent at the gate</li>
              <li>More time at the game</li>
            </ul>
          </div>
          <p className="mt-2 text-center">
            Tickets can be scanned with personnels' phones; no need for new
            devices.
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
              Ticketnest uses feedback from athletic directors and students to
              make the platform better
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
          <p className="mt-2 text-center">Ticketnest is built for MCPS</p>
        </div>
      </div>

      <div>
        <div className="hero h-fit font-1">
          <div className="hero-content w-full h-full gap-2">
            <div className="grid sm:grid-cols-2 w-full h-full gap-3 items-center ">
              <div className="text-center">
                <h3 className="font-1 font-extrabold text-6xl">
                  So what are you waiting for?
                </h3>
                <a
                  href="https://docs.google.com/forms/d/e/1FAIpQLSdPJ_yzTWM8ozdB1zuLfuitvYZ159Hn_B6lkPxQtN2Zumb_0A/viewform?usp=dialog"
                  className="font-1 font-semibold mt-2 btn-outline btn btn-secondary"
                >
                  Help us get approved
                </a>
              </div>

              <div className=" border border-primary rounded-box overflow-y-auto h-[60vh]">
                <iframe
                  className="w-full h-full"
                  src="https://docs.google.com/forms/d/e/1FAIpQLSdPJ_yzTWM8ozdB1zuLfuitvYZ159Hn_B6lkPxQtN2Zumb_0A/viewform?usp=dialog"
                ></iframe>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </section>
  );
}
