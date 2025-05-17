import React from "react";

const Homepage = () => {
  return (
    <div className="bg-logo-black w-full h-full">
      <img
        className="object-cover relative w-full h-full"
        src="/img/sample.jpg"
        alt=""
      />
      <div className="bg-radial from-40%  from-transparent to-black absolute w-full h-full inset-0 " />
    </div>
  );
};

export default Homepage;
