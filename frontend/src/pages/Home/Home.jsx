import React from "react"; 
import Header from "../../components/Header/Header";
import About from "../../components/About/About";
import Features from "../../components/Features/Features";
import HowItWorks from "../../components/HowItWorks/HowItWorks";
import MentorshipProgram from "../../components/MentorshipProgrma/MentorshipProgram";
import Testimonials from "../../components/Testimonials/Testimonials";
import Contact from "../../components/Contact/Contact";

export default function Home(){
    return (
        <>
        <About/>
        <Features/>
        <HowItWorks/>
        <MentorshipProgram/>
        <Testimonials/>
        <Contact/>
        </>
    )
}