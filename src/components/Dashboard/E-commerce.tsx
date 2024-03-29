"use client";
import React from "react";
import ChatGPT from "../ChatGPT/ChatGPT";
import ServicesPanel from "../ServicesPanel/ServicesPanel";

const ECommerce: React.FC = () => {
  return (
    <>
      <div className="mt-4 grid grid-cols-12 gap-4 md:mt-6 md:gap-6 2xl:mt-7.5 2xl:gap-7.5">
        <ChatGPT />
        <ServicesPanel />
      </div>
    </>
  );
};

export default ECommerce;
