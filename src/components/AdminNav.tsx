import { ChartBarSquareIcon, CogIcon, TableCellsIcon, ShieldCheckIcon } from "@heroicons/react/24/solid";

import { Link } from "react-router-dom";



export default function AdminNav() {
  return (
    <>
      <div className="p-3 font-1 bg-base-100 flex flex-col gap-2 sticky top-[9vh] left-0 h-screen">
        <Link to="/admin/admindashboard"
          // onClick={() => props.setCurrentNav("dashboard")}
          className="flex flex-col items-center justify-items-center p-3 hover:bg-base-300 select-none cursor-pointer "
        >
          <ChartBarSquareIcon className="size-6" />
          Dashboard
        </Link>

        <Link
          to="/settings"
          className="flex flex-col items-center justify-items-center p-3 hover:bg-base-300 select-none cursor-pointer"
        >
          <CogIcon className="size-6" />
          Settings
        </Link>
        <Link to="/admin/financials"
          // onClick={() => props.setCurrentNav("financial")}
          className="flex flex-col items-center justify-items-center p-3 hover:bg-base-300 select-none cursor-pointer "
        >
          <TableCellsIcon className="size-6" />
          Financial
        </Link>

        <Link to="/admin/security"
          // onClick={() => props.setCurrentNav("security")}
          className="flex flex-col items-center justify-items-center p-3 hover:bg-base-300 select-none cursor-pointer "
        >
          <ShieldCheckIcon className="size-6" />
          Security
        </Link>
      </div>
    </>
  );
}
