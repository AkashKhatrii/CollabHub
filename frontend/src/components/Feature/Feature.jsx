import React, { useState } from "react";
import './Feature.css'
export default function Feature(props){

    const [showDesc, setShowDesc]= useState(false);

    return (
        <div className="feature-container">
            <div className="top">
            <h3>{props.title}</h3>
            <button onClick={() => setShowDesc(!showDesc)}>{showDesc ? '-' : '+'}</button>
            </div>

            { showDesc &&
            <div className="bottom">
            <p>{props.desc}</p>
            </div>
            }
        </div>
    )
}