import React from "react";
import './About.css'
export default function About(){

    return(
        <section className="about-section">
            <div className="about-section-wrapper">
                <div className="about-info">
                    <h2>Lorem ipsum dolor sit amet.</h2>
                    <p>CollabMate is designed to help students find and collaborate with like-minded individuals on exciting projects.</p>
                </div>
                {/* <div className="about-img">
                     <img src='/images/collaboration.jpg' alt='Collaboration' className='about-image' />
                </div> */}
            </div>
        </section>
    )
}