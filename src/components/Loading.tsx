// import React from "react";



export default function Loading() {




    return (

        <>
            <div className="h-screen overflow-y-hidden w-full absolute z-40 bg-black opacity-75">

            </div>

            <div className="absolute top-[50%] translate-y-[-50%] z-50 translate-x-[-50%] left-[50%]">
                <div className="loading loading-spinner size-20 text-secondary"></div>
            </div>
        
        </>
    )
}