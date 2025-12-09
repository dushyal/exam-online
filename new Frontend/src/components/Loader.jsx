// src/components/Loader.jsx
"use client";

import React from "react";
import { DotLottieReact } from "@lottiefiles/dotlottie-react";

const Loader = ({ size = 200, message = "Loading..." }) => {
  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <DotLottieReact
        src="https://lottie.host/10e5fee2-de31-4b34-9fdb-03cb4ad5d98b/rknmegUh4T.lottie"
        loop
        autoplay
        className={`w-${size} h-${size}`}
        style={{ width: size, height: size }}
      />
      <p className="mt-4 text-gray-600 text-lg">{message}</p>
    </div>
  );
};

export default Loader;



