
import './Contact.css'
export default function Contact(){
    return (
        <section id="contact" className="contact-section">
            <div className="contact-section-wrapper">
                <h2>Contact Us</h2>
                <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Iure, fugiat aspernatur! Repudiandae praesentium voluptatum sed.</p>
                <div className="input">
                    <input type="text" placeholder='Email'></input>
                    <button>Submit</button>
                </div>
            </div>
        </section>
    )
}