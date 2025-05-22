import { useState, useRef, useEffect } from "react";
import { Line } from "react-chartjs-2";
import Navbar from "../../components/Navbar.tsx";
import AdminNav from "../../components/AdminNav.tsx";
import Footer from "../../components/Footer.tsx";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Link } from "react-router-dom";
import { convertTime, callApi } from "../../functions/functions.ts"


// import Footer from "./Footer"
// import callApi from "../functions/functions";
// Register required components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);
import {
  BanknotesIcon,
  CurrencyDollarIcon,
  TicketIcon,
  CalendarIcon,
  BellAlertIcon
} from "@heroicons/react/24/outline";

import type { DataMetrics, ResType } from "../types.ts";

export default function Financials() {
  // const [user, setUser] = useState(null);
  // const chartRef = useRef(null);
  const [dataMetrics, setDataMetrics] = useState<DataMetrics | null>(null);
  const [timeInterval, setTimeInterval] = useState<number>(7);
  const [loading, setLoading] = useState<boolean>(false);
  const [chartLoading, setChartLoading] = useState<boolean>(false);
//   const [user, setUser] = useState<user | null>(null)
  // State for graph data
  const [graphData, setGraphData] = useState({
    labels: [],
    data: [],
  });

  useEffect(() => {




    // const savedUser = JSON.parse(sessionStorage.getItem("user"));
    // setUser(savedUser);

    // if (savedUser === null) {
    //   window.location.replace("/login"); 

    // }
    



    setLoading(true);
    callApi("/getFinancials", "GET", null).then((res: ResType) => {
      if (res.code === "err") {
        window.location.replace("/login");
      } else if (res.code === "ok") {
        setDataMetrics(JSON.parse(res.message));
      } else {
        window.location.replace("/login");
      }
      setLoading(false);
    });

    // Initial fetch of graph data
    fetchGraphData(timeInterval);
  }, []);

  // Fetch graph data whenever timeInterval changes
  useEffect(() => {
    fetchGraphData(timeInterval);
  }, [timeInterval]);

  // Function to fetch graph data based on selected time interval
  const fetchGraphData = async (interval: number) => {
    setChartLoading(true);
    try {
      const res = await callApi(
        `/getFinancialsGraph?timeInterval=${interval}`,
        "GET",
        null
      );
      if (res.code === "err") {
        window.location.replace("/login");
      } else if (res.code === "ok") {
        // Parse the response data which is an array of {date, amount} objects
        const dataArray = JSON.parse(res.message);

        // Extract labels (dates) and data (amounts) from the array
        // Reverse the arrays so they display chronologically (oldest to newest)

        

        const labels = dataArray.map((item: any) => item.date).reverse();
        const amounts = dataArray.map((item: any) => item.amount).reverse();

        setGraphData({
          labels: labels,
          data: amounts,
        });
        setChartLoading(false);
      }
    } catch (error) {
      console.error("Error fetching graph data:", error);
    } finally {
      setChartLoading(false);
    }
  };

  const handleIntervalChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setTimeInterval(Number(e.target.value));
  };

  const data = {
    labels: graphData.labels,
    datasets: [
      {
        label: "Revenue ($)",
        data: graphData.data,
        borderColor: "#1f77b4",
        backgroundColor: "rgba(31, 119, 180, 0.2)",
        fill: true,
        tension: 0.4,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: "bottom",
      },
      tooltip: {
        callbacks: {
          label: function (context: any) {
            return `Revenue: $${context.raw}`;
          },
        },
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        position: "right",
        title: {
          display: true,
          text: "Amount ($)",
        },
        ticks: {
          callback: function (value: any) {
            return "$" + value;
          },
        }
      },
      x: {
        title: {
          display: true,
          text: "Date",
        },
      },
    },
  };

  return (
    <>
       <section className="w-full h-full">
        <Navbar />

        <section className="w-full h-full flex flex-row">
          <AdminNav />
            
          <div className="w-5/6 mx-auto mt-4">
          {/* bar at the top */}
          {(!loading&&dataMetrics?.totalRevenue&&dataMetrics?.ticketsSold&&dataMetrics?.amountAvailable&&dataMetrics) ? (
            <>
              <div className="flex flex-row gap-4">
                <div className="border font-1 rounded-box p-8 w-96 flex flex-row items-center justify-between">
                  <div>
                    <p className="font-bold font-1 text-2xl">
                      $
                      {dataMetrics.totalRevenue.toLocaleString("en-US", {
                        minimumFractionDigits: 2,
                        maximumFractionDigits: 2,
                      })}
                    </p>
                    <p>Total Revenue</p>
                  </div>

                  <BanknotesIcon className="size-6" />
                </div>

                <div className="border font-1 rounded-box p-8 w-64 flex flex-row items-center justify-between">
                  <div>
                    <p className="font-bold font-1 text-2xl">
                      {dataMetrics.ticketsSold.toLocaleString()}
                    </p>
                    <p>Tickets sold</p>
                  </div>

                  <TicketIcon className="size-6" />
                </div>

                <div className="border font-1 rounded-box p-8 w-64 flex flex-row items-center justify-between">
                  <div>
                    <p className="font-bold font-1 text-2xl">
                      $
                      {dataMetrics.totalRevenue !== 0 &&
                      dataMetrics.ticketsSold !== 0
                        ? Number(
                            dataMetrics.totalRevenue / dataMetrics.ticketsSold
                          ).toFixed(2)
                        : "0.00"}
                    </p>
                    <p>Average Price</p>
                  </div>

                  <CurrencyDollarIcon className="size-6" />
                </div>
              </div>

              <div className="mt-4 p-4 font-1 border rounded-box w-full ">
                <div className="flex flex-row items-center gap-4 ">
                  <p className="font-1 font-bold text-lg ml-6">Total Revenue</p>
                  <select
                    className="select w-fit select-primary"
                    value={timeInterval}
                    onChange={handleIntervalChange}
                  >
                    <option value="7">Past 7 days</option>
                    <option value="30">Past 30 days</option>
                    <option value="365">Past 12 months</option>
                  </select>
                </div>

                <div className="w-full min-h-[50vh] flex items-center justify-center">
                  {chartLoading ? (
                    <div className="flex items-center justify-center h-full">
                      <div className="loading loading-spinner loading-lg size-12"></div>
                    </div>
                  ) : (
                    <Line data={data} options={options} />
                  )}
                </div>
              </div>
            </>
          ) : (
            <div className="flex flex-col w-full gap-4">
              <div className="flex flex-row w-full gap-10">
                <div className="h-32 w-full skeleton"></div>
                <div className="h-32 w-full skeleton"></div>
                <div className="h-32 w-full skeleton"></div>
              </div>

              <div className="skeleton w-full h-[50vh]"></div>
            </div>
          )}

          <div className="bg-base-300 font-1 my-4 border p-3 rounded-box">
            <p className="font-1 font-semibold text-lg">Payout Funds</p>


          <section className="mt-2">
          <div className="stats shadow">

          <div className="stat">
    <div className="stat-figure text-secondary">
      <BanknotesIcon className="size-6" />
    </div>
    <div className="stat-title">Amount available</div>
    {(dataMetrics&&dataMetrics.amountAvailable!==null&&dataMetrics.amountAvailable!==undefined) && (
         <div className="stat-value text-secondary">{dataMetrics.amountAvailable.toFixed(2)}</div>
    )}
 
    {/* <div className="stat-desc">21% more than last month</div> */}
  </div>
  <div className="stat">
    <div className="stat-figure text-primary">
      <CalendarIcon className="size-6" />
    </div>
    <div className="stat-title">Time since last payout</div>
    <div className="stat-value text-primary">{convertTime(dataMetrics&&dataMetrics.lastWithdraw!==null ? dataMetrics?.lastWithdraw : 0)}</div>
    {/* <div className="stat-desc">21% more than last month</div> */}
  </div>

  

  
</div>
          </section>

          <div className="">
          <button className="btn btn-sm mt-2 btn-disabled">
            Request Payout 
        </button>
        <div className="alert alert-info mt-2 font-1">
        <BellAlertIcon className="size-6" />
          <p>Money is paid out daily on a rolling basis. If you have having any issues receiving money, contact <a className="underline" href="mailto:contact@ticketnest.us">us here.</a></p>

        </div>


          </div>
          
          {/* {user&&user.hasVerified ?
            <button className="btn mt-2 btn-sm">
            Request payout
          </button>
          
          : 
          <>
        <button className="btn mt-2 btn-disabled">
            Request Payout 
        </button>

          </> */}
            
          
          
        
           

          </div>
        </div>
        </section>
        
        
        <Footer />
      </section>
    </>
  );
}
