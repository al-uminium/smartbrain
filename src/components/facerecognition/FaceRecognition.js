import React from 'react'
import './FaceRecognition.css'

const FaceRecognition = ({ imageUrl, box }) => {
    return(
        <div className="center img">
            <img id='inputimage' className="face" src={imageUrl} />
            <div className="bounding-box" style={{top: box.tR, bottom: box.bR, left: box.lC, right: box.rC, }}></div>
        </div>
    )
}

export default FaceRecognition
