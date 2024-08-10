import React from "react";
import './About.css'
export default function About(){

    return(
        <section id="about" className="about-section">
            <div className="about-section-wrapper">
                <div className="about-info">
                    <h2>Empower Your Collaboration Journey</h2>
                    <p>CollabHub connects you with peers and mentors to bring your projects to life. Discover, collaborate, and grow with our vibrant community. Join us to turn your academic and career aspirations into reality.</p>
                </div>
                {/* <div className="about-img">
                     <img src='/images/collaboration.jpg' alt='Collaboration' className='about-image' />
                </div> */}
            </div>
        </section>
    )
}