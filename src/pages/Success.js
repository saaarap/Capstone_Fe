import React from "react";
import { Button } from "flowbite-react";

function Success() {
  const goToHome = () => {
    window.location.href = "http://localhost:3000/home";
  };

  return (
    <div className="flex flex-wrap gap-2">
      <Button onClick={goToHome}>Go to Home!</Button>
    </div>
  );
}

export default Success;
