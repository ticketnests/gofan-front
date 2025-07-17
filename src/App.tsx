import { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Index from "./page";
import School from "./school/page";
import Purchase from "./purchase/page";
import Signup from './signup/page';
import Login from "./login/page";
import callApi from './functions/functions';
import LoggedInContext from "./functions/contexts";
import Dashboard from './dashboard/page';
import AdminDash from './admin/adminDashboard/page';
import Settings from './settings/page';
import ScanUser from './admin/scanuser/page';
import SecuritySignup from './createSecurity/page';
import Mcps from './mcps/page';
import NotFound from './notFound/page';
import Privacy from './privacy/page';
import Financials from './admin/financials/page';
import Terms from './terms/page';
import Organization from './organization/page';
import useSession from "./functions/auth";
import type { User } from "./types";
import Security from './admin/security/page';
import LandingPage from "./landing/page";
import AdminRegister from './adminregister/page';
import Loading from "./components/Loading"
function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const userStored = useSession();
    setUser(userStored);

    callApi("/getUser", "GET", null).then((res) => {
      if (res.code === "ok") {
        sessionStorage.setItem("user", res.message);
        setIsLoggedIn(true);
      } else {
        sessionStorage.removeItem("user");
        setIsLoggedIn(false);
      }
      setLoading(false);
    });
  }, []);

  if (loading) return <Loading />;

  return (
    <BrowserRouter>
      <LoggedInContext.Provider value={isLoggedIn}>
        <Routes>

          {/* Public routes */}
          <Route path="/" element={<Index />} />
          <Route path="/school/:schoolId" element={<School />} />
          <Route path="/purchase/:schoolId/:gameId" element={<Purchase />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/createSecurity/:id" element={<SecuritySignup />} />
          <Route path="/mcps" element={<Mcps />} />
          <Route path="/privacy" element={<Privacy />} />
          <Route path="/terms" element={<Terms />} />
          <Route path="/organization/:id/:schoolName" element={<Organization />} />
          <Route path="/landing" element={<LandingPage />} />
          <Route path="/adminRegister" element={<AdminRegister />} />

          {/* Protected routes */}
          {isLoggedIn ? (
            <>
              {(user?.isAdmin || user?.isSecurity) && (
                <Route path="/admin/scanUser" element={<ScanUser />} />
              )}

              {user?.isAdmin && (
                <>
                  <Route path="/admin/financials" element={<Financials />} />
                  <Route path="/admin/security" element={<Security />} />
                  <Route path="/admin/adminDashboard" element={<AdminDash />} />
                </>
              )}

              <Route path="/settings" element={<Settings />} />

              {!user?.isAdmin && !user?.isSecurity && (
                <Route path="/dashboard" element={<Dashboard />} />
              )}

              {/* Catch-all for unknown protected routes */}
              <Route path="/*" element={<NotFound />} />
            </>
          ) : (
            // Not logged in: any unknown route also 404s
            <Route path="/*" element={<NotFound />} />
          )}
        </Routes>
      </LoggedInContext.Provider>
    </BrowserRouter>
  );
}

export default App;
