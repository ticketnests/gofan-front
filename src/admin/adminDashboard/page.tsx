// import React, { useState } from "react";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
// import LoggedInContext from "../functions/contexts";
import TicketDashboard from "../../components/TicketDashboard";
import AdminNav from "../../components/AdminNav";
// import Financials from "../../components/Financials";
// import Security from "../components/Security";

export default function AdminDash() {
//   const loggedIn = useContext(LoggedInContext);

  // const [currentNav, setCurrentNav] = useState("dashboard");

  return (
    <>
      <section className="min-h-screen h-full overflow-y-auto">
        <Navbar />
        <div className="flex flex-row h-full">
            <AdminNav />

     
            <div className=" w-5/6 mx-auto mt-8">
              <p className="font-1 font-semibold text-2xl">Dashboard</p>

              <TicketDashboard />
            </div>
          
{/* 
          {currentNav === "financial" && <Financials />}

          {currentNav === "security" && <Security />} */}
        </div>

        <Footer />
      </section>
    </>
  );
}
