import { useState, useEffect } from 'react';

import {BrowserRouter, Routes,Route} from "react-router-dom"
import Index from "./page"
import School from "./school/page"
import Purchase from "./purchase/page"
import Signup from './signup/page'
import Login from "./login/page"
import callApi from './functions/functions'
import LoggedInContext from "./functions/contexts"
import Dashboard from './dashboard/page'
import AdminDash from './admin/adminDashboard/page'
import Settings from './settings/page'
import ScanUser from './admin/scanuser/page'
import SecuritySignup from './createSecurity/page'
import Mcps from './mcps/page'
import NotFound from './notFound/page'
import Privacy from './privacy/page'
import Financials from './admin/financials/page';
import Terms from './terms/page'
import Organization from './organization/page'
import useSession from "./functions/auth"
import type {User} from "./types"
import Security from './admin/security/page';
import LandingPage from "./landing/page";
import AdminRegister from './adminregister/page';
function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState<User>(useSession())
  useEffect(() => {
    const x = useSession();
    if (x !== null && x !== undefined) {

      setUser(user);
      setIsLoggedIn(true);
    } else {
      setIsLoggedIn(false);
    }
  }, [sessionStorage.getItem("user")]);

  useEffect(() => {
    // console.log("useEffect was called")
    // const userStored = sessionStorage.getItem("user");
    const userStored = useSession();
    setUser(userStored);
    callApi("/getUser", "GET", null).then((res) => {
      console.log("this was called", res);
      // console.log("current user value", "asdf")
      if (res.code === "ok") {
        sessionStorage.setItem("user", res.message);
        setIsLoggedIn(true);
        console.log("this occured");
      } else {
        console.log("i just reset it");
        sessionStorage.removeItem("user");
      }
    });
  }, []);

  return (
    <>
      <BrowserRouter>
        <LoggedInContext.Provider value={isLoggedIn}>
          <Routes>
       
                <Route path="/adminRegister" element={<AdminRegister />} />
               
                <Route path="/" element={<Index />} />
                <Route path="/school/:schoolId" element={<School />} />
                <Route path="/purchase/:schoolId/:gameId" element={<Purchase />} />
                <Route path="/login" element={<Login />} />


                <Route path="/organization/:id/:schoolName" element={<Organization />} />
                
                <Route path="/signup" element={<Signup />} />
                <Route path="/createSecurity/:id" element={<SecuritySignup />} />
                <Route path='/mcps' element={<Mcps />} />
                <Route path="/privacy" element={<Privacy />} />
                <Route path="/terms" element={<Terms />} />
                {/* <Route path="/robots.txt" element={<div> User-agent: * <br /> Disallow: / </div>} /> */}
                <Route path="/landing" element={<LandingPage />} />

               {isLoggedIn ? <>

               {((user&& Object.keys(user).includes('isAdmin') ) ? user.isAdmin||user.isSecurity : false) && (
                <>
                  <Route path="/admin/scanUser" element={<ScanUser />} />
                </>
               )}

               {((user&& Object.keys(user).includes('isAdmin') ) ? user.isAdmin : false) && (
                <>
                    {/* <Route path="/admin/scanUser" element={<ScanUser />} /> */}
                 <Route path="/admin/financials" element={<Financials />} />
                 <Route path="/admin/security" element={<Security />} />
                 <Route path="/admin/adminDashboard" element={<AdminDash />} /> 
                </>
             
               )}

                   <Route path="/settings" element={<Settings />} />

                   {(user&&!(user.isAdmin||user.isSecurity)) && (

<Route path="/dashboard" element={<Dashboard />} />
                   )}
                   
                
                   <Route path="/*" element={<NotFound />} />
               </> : <>


               <Route path="/*" element={<NotFound />} />
           
               
               </>}
              
               


          </Routes>
        </LoggedInContext.Provider>
      </BrowserRouter>
    </>
  );
}

export default App;
