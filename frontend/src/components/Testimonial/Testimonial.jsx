import { FaStar } from "react-icons/fa";
import './Testimonial.css'
export default function Testimonial(){
    return(
        <div className="testimonial">
            <div className="reviews">
                <FaStar />
                <FaStar/>
                <FaStar/>
                <FaStar/>
            </div>

            <div className="text">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Sapiente odio sint enim ab. Quaerat mollitia error doloribus aut modi quasi beatae tempore laborum sequi quod in iure quidem, esse porro perferendis voluptatum natus? Facilis obcaecati doloribus quasi assumenda ea beatae.
            </div>

            <div className="author">
                - Akash Khatri
            </div>
        </div>
    )
}