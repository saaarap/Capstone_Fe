import React from "react";
import { Button } from "flowbite-react";
import { Link } from "react-router-dom";

function Success() {
  return (
    <div className="flex flex-wrap gap-2">
      <Link to="/home"><Button>Go to Home!</Button> </Link>
    </div>
  );
}

export default Success;
