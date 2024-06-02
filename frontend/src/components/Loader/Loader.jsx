import Lottie from "lottie-react";
import loader from "../../lottie/loader.json";
import './Loader.css'

export default function Loader(){
    return (
        <section className="loader-section">
        <Lottie animationData={loader} 
        style={{height: 300, width: 300}} />
        </section>
    )
}