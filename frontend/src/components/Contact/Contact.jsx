
import './Contact.css'
export default function Contact(){
    return (
        <section id="contact" className="contact-section">
            <div className="contact-section-wrapper">
                <h2>Get in Touch</h2>
                <p>Have questions or need help? Reach out to us, and we’ll get back to you soon.</p>
                <div className="input">
                    <label>
                    <input type="text" placeholder='Email'></input>
                    <button>Submit</button>
                    </label>
                </div>
            </div>
        </section>
    )
}