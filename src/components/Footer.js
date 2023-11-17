"use client";

import { Footer } from "flowbite-react";
import image from "../components/finale.png";
export default function DefaultFooter() {
  return (
    <Footer container>
      <img src={image} className="mr-3 h-20" alt="Cucina Compartida Logo" />
      <Footer.Copyright by="Cucina Compartida" href="#" year={2023} />
      <Footer.LinkGroup>
        <Footer.Link href="#">Privacy Policy</Footer.Link>
        <Footer.Link href="#">License</Footer.Link>
        <Footer.Link href="#">Contatti</Footer.Link>
      </Footer.LinkGroup>
    </Footer>
  );
}
