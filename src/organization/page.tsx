import { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import { formatString, callApi } from "../functions/functions";
import { useParams } from "react-router-dom";
import Footer from "../components/Footer";
import { FolderOpenIcon } from "@heroicons/react/24/outline";
import { Helmet, HelmetProvider } from "react-helmet-async";
import { Link } from "react-router-dom";


interface SchoolData {
    name: string | undefined
}

interface Organization {
    name: string;
    id: string;


}

export default function Organization() {
  const { id, schoolName } = useParams();
  const [loading, setLoading] = useState(true);

  const [schoolData, setSchoolData] = useState<SchoolData>({
    name: schoolName,
  });

  const [organizations, setOrganizations] = useState<Organization[] | []>([]);

  useEffect(() => {
    setLoading(true);
    callApi(`/getOrganization?uuid=${id}`, "GET",null).then((res) => {
      if (res.code === "ok") {
        const message = JSON.parse(res.message);
        setSchoolData((prev) => {
          return {
            ...prev,
            address: message.address,
          };
        });
        setOrganizations(JSON.parse(res.message).allClubs);
      } else {
        window.location.replace("/");
      }

      setLoading(false);
    });
  }, [id]);

  return (
    <>  
    <HelmetProvider>


      <Navbar />
      <Helmet>
            <meta charSet="utf-8" />
            <title>{formatString(schoolData.name ? schoolData?.name : "")} • ticketnest</title>
            <meta
      name="description"
      content={`${formatString(schoolData.name ? schoolData?.name : "")}'s clubs and athletic ticketing here. CLick to view events and purchase tickets!`}
    />
       
       </Helmet>
      {/* Mobile-responsive container with improved padding */}
      <div className="min-h-[80vh] mb-10 w-full px-4 md:px-6 lg:w-5/6 xl:w-4/6 mx-auto font-1 relative flex flex-col gap-4 items-center">
        {/* School name header */}
        <div className="w-full mt-3 bg-base-200 p-3 md:p-4 border rounded-lg shadow-sm">
          <p className="text-2xl md:text-3xl lg:text-4xl font-bold text-center">
            {formatString(schoolData.name ? schoolData?.name : "")}
          </p>
        </div>

        {/* Organizations list */}
        <div className="w-full flex flex-col gap-3 md:gap-4 font-1">
          {loading ? (
            // Loading skeletons
            <div className="space-y-3">
              <div className="skeleton bg-neutral p-3 w-full h-12"></div>
              <div className="skeleton w-full h-24"></div>
              <div className="skeleton w-full h-24"></div>
              <div className="skeleton w-full h-24"></div>
            </div>
          ) : (
            // Organization cards with responsive layout
            <>
              {organizations?.map((org, i) => (
                <div
                  key={i}
                  className="bg-base-200 w-full p-3 md:p-4 rounded-box flex flex-col sm:flex-row items-start sm:items-center gap-3"
                >
                  <div className="flex flex-1 flex-col gap-2 w-full">
                    <div className="badge badge-primary">
                      {formatString(schoolData.name ? schoolData?.name : "")}
                    </div>
                    <p className="font-bold text-lg break-words">{org.name}</p>
                  </div>

                  <div className="w-full sm:w-auto mt-2 sm:mt-0">
                    <Link 
                      className="btn btn-sm md:btn-md w-full sm:w-auto justify-center" 
                      to={"/school/" + org.id}
                    >
                      <span className="hidden sm:inline">Open Events</span>
                      <span className="inline sm:hidden">Events</span>
                      <FolderOpenIcon className="w-5 h-5" />
                    </Link>
                  </div>
                </div>
              ))}
            </>
          )}
        </div>
      </div>

      <Footer />
      </HelmetProvider>
  
    </>
  );
}