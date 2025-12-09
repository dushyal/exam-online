

// src/components/Loader.jsx
"use client";

import React from "react";
import { DotLottieReact } from "@lottiefiles/dotlottie-react";

const NoData = ({ size = 200, message = "Loading..." }) => {
  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <DotLottieReact
        src="https://lottie.host/28a180bd-0cc9-495b-bfaa-60f312b2ff0d/O6uoHBc6P0.lottie"
        loop
        autoplay
        className={`w-${size} h-${size}`}
        style={{ width: size, height: size }}
      />
      <p className="mt-4 text-gray-600 text-lg">{message}</p>
    </div>
  );
};

export default NoData;
