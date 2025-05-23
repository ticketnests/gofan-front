import React, { useState, useEffect } from "react";
import { callApi, formatString } from "../functions/functions.ts";
import { Link } from "react-router-dom";
import type { ResType, SearchResult } from "../types";
import useSession from "../functions/auth.ts"

// const allSchools = [
//   {
//     county: "Montgomery County",
//     name: "Walter Johnson",
//     school: 4123,
//   },
//   {
//     county: "Montgomery County",
//     name: "Blair",
//     school: 123,
//   },
// ];



export default function Search() {
  const [query, setQuery] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [searchResults, setSearchResults] = useState<SearchResult[] | []>([]);
  const [isAdmin, setIsAdmin] = useState(() => {return useSession()!==null ? useSession().isAdmin : false});
  const findMostRelevant = () => {
    if (query && query.length > 0) {
      setLoading(true);

      callApi("/schoolSearch", "POST", { query: query.toLowerCase() }).then(
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
    if (query.length % 3 === 0 && query.length !== 0) {
        findMostRelevant()
    }
  }, [query, findMostRelevant]);

  useEffect(() => {
    
    const userStored = sessionStorage.getItem("user");

    if (userStored!==null) {
      setIsAdmin(JSON.parse(userStored).isAdmin);
    }



  },[])

  return (
    <>
    <div className="hero min-h-screen bg-gradient-to-b from-base-100 to-base-300">
      <div className="hero-content text-center">
        <div className="flex flex-col items-center w-full max-w-xl gap-6">
          <h1 className="text-5xl font-bold font-1 text-base-content">
            Buy your tickets
          </h1>

          <div className="w-full">
            <div className="join w-full">
              <input
                value={query}
                maxLength={100}
                onChange={(e) => setQuery(e.target.value)}
                className="input input-lg join-item input-bordered input-secondary w-full font-1"
                placeholder="Search for your school here"
              />
              <div className="btn btn-lg join-item btn-primary gap-2">
                Search
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="size-5"
                >
                  <path
                    fillRule="evenodd"
                    d="M10.5 3.75a6.75 6.75 0 1 0 0 13.5 6.75 6.75 0 0 0 0-13.5ZM2.25 10.5a8.25 8.25 0 1 1 14.59 5.28l4.69 4.69a.75.75 0 1 1-1.06 1.06l-4.69-4.69A8.25 8.25 0 0 1 2.25 10.5Z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
            </div>

            <div className="mt-3 p-2 border rounded-box bg-base-100">
              <div className="flex flex-col gap-2">
                {loading ? (
                  Array(3)
                    .fill("")
                    .map((_, i) => (
                      <div
                        key={i}
                        className="flex flex-row gap-3 items-center"
                      >
                        <div className="skeleton h-10 w-10 rounded-full"></div>
                        <div className="skeleton h-10 w-full rounded"></div>
                      </div>
                    ))
                ) : searchResults?.length > 0 ? (
                  searchResults.map((result, i) => (
                    <Link
                      to={
                        window.location.href + "organization" + "/" + result.categoryId + "/" + formatString(result.schoolName)
                      }
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
                    </Link>
                  ))
                ) : (
                  <div className="text-center py-2">
                    <p className="font-1 font-semibold text-base-content">
                      No School found
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>
          {(isAdmin) && (
               <div className="alert alert-error w-full max-w-xl font-1">
               <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-6">
       <path fillRule="evenodd" d="M9.401 3.003c1.155-2 4.043-2 5.197 0l7.355 12.748c1.154 2-.29 4.5-2.599 4.5H4.645c-2.309 0-3.752-2.5-2.598-4.5L9.4 3.003ZM12 8.25a.75.75 0 0 1 .75.75v3.75a.75.75 0 0 1-1.5 0V9a.75.75 0 0 1 .75-.75Zm0 8.25a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5Z" clipRule="evenodd" />
     </svg>
     
                 You are currently logged in as an Admin or Security user. You cannot buy tickets as an admin or security user
                 
               </div>
          )}

          <Link to="/mcps" className="font-2 font-semibold">What's wrong with GoFan? <u>Find out what.</u></Link>
       
        </div>

      
      </div>
    </div>
    
    </>
    
  );
}
