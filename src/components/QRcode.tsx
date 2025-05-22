// import React from "react";


interface props {
    href: string;
}

const QRCodeWithEffect = (props: props) => {
  return (
    <div className="relative sm:w-fit w-full mx-auto my-5 border-4 border-secondary border-dashed select-none p-2 overflow-hidden">
      {/* QR Code */}
      <img src={props.href} className="relative z-10 w-96 h-full object-cover" />

      {/* Scanning lines */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="scanner-line bg-primary z-50"></div>
        <div className="scanner-line bg-primary delay z-50"></div>
      </div>

      {/* Styles */}
      <style>
        {`
          .scanner-line {
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 10px;
     
            border-radius: 9999px;
            box-shadow: 0 0 20px #3b82f6;
            animation: scan 3s linear infinite;
          }

          .delay {
            animation-delay: 1.5s; /* half the animation duration for staggered effect */
          }

          @keyframes scan {
            0% { top: 0%; }
            50% { top: 90%; }
            100% { top: 0%; }
          }
        `}
      </style>
    </div>
  );
};

export default QRCodeWithEffect;
