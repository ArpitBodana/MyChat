import React from "react";
import animationData from "../animations/loading.json";
import Lottie2 from "react-lottie";

function Loading() {
  const lottieOptions = {
    loop: true,
    autoplay: true,
    animationData: animationData,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };
  return (
    <div className=" min-vh-100 d-flex justify-content-center align-items-center">
      <Lottie2 options={lottieOptions} width={200} height={200} />
    </div>
  );
}

export default Loading;
