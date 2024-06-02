import Testimonial from "../Testimonial/Testimonial";
import './Testimonials.css'
export default function Testimonials(){
    return(
        <section className="testimonial-section">
            <div className="testimonial-section-wrapper">
            <div className="testimonials-heading">
            <h2>Testimonials</h2>
            <p>Look at what people have to say about us!</p>
            </div>
            
                <div className="testimonials-view">
                    <Testimonial/>
                    <Testimonial/>
                    <Testimonial/>
                    <Testimonial/>
                </div>
            </div>
        </section>
    )
}