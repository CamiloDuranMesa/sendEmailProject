import React from "react";
import { ContactUs } from "./ContactUs/ContactUs";
import { Routes, Route } from "react-router-dom";
import emailjs from '@emailjs/browser';
import { useEffect } from "react";




export const App = () =>{
      useEffect(() => {
          emailjs.init('bNXoCvHdrPdvM2F7P');
      }, []);
  return(
    <>
      <Routes>
        <Route path="/" element={<ContactUs />} />
      </Routes>
    </>
    
  )
}