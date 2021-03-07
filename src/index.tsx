import * as React from "react";
import "./slider.scss";

import { Arrow } from "./components/Arrow";

const Slider: React.FC = () => {
  const [currentImage, setCurrentImage] = React.useState(0);

  const incrementImage = () => {
    setCurrentImage(currentImage + 1);
  };

  const decrementImage = () => {
    setCurrentImage(currentImage - 1);
  };

  return (
    <div className="slider">
      <div className="button-container button-container-left">
        <Arrow orientation="left" onClick={decrementImage} />
      </div>
      <div className="slider-content"></div>
      <div className="button-container button-container-right">
        <Arrow orientation="right" onClick={incrementImage} />
      </div>
    </div>
  );
};

export default Slider;
