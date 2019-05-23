import React from 'react';
import { Slide } from 'react-slideshow-image';

 
const slideImages = [
  "/images/covoiturage1.jpg",
  "https://s3.us-east-2.amazonaws.com/dzuz14/thumbnails/canyon.jpg",
  "https://s3.us-east-2.amazonaws.com/dzuz14/thumbnails/city.jpg",

];
 
const properties = {
  duration: 5000,
  transitionDuration: 500,
  infinite: true,
  indicators: true,
  arrows: true
}
 
const Slideshow = () => {
    return (
      <Slide {...properties}>
        <div className="each-slide myimage">
          <div style={{'backgroundImage': `url(../images/covoiturage1.jpg)`}}>
            <span>Profiter de la vie</span>
          </div>
        </div>
        <div className="each-slide">
          <div style={{'backgroundImage': `url(${slideImages[1]})`}}>
            <span>Slide 2</span>
          </div>
        </div>
        <div className="each-slide">
          <div style={{'backgroundImage': `url(${slideImages[2]})`}}>
            <span>Slide 3</span>
          </div>
        </div>
      </Slide>
    )
}

export default Slideshow;