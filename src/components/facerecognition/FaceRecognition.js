import React from 'react'
import './FaceRecognition.css'

const FaceRecognition = ({ imageUrl, box }) => {
    return(
        <div className="center img" >
            <img id='inputimage' alt='' className="face" src={imageUrl} />
            <div className="bounding-box" style={{top: box.tR, right: box.rC, bottom: box.bR, left: box.lC }}></div>
        </div>
    )
}

export default FaceRecognition
