import * as React from "react";
import "./slider.scss";

import { Button } from "./components/Button";

interface SliderProps {
  className?: string;

  /**
   * Controls wheter the slider is finite or not.
   * Ie. When the user reaches the end of the image list ( begining or end ) does it reset to the other side.
   *
   * @default true
   */
  isInfinite?: boolean;

  /**
   * List of images to be displayed. Expects a list of urls to be used in a <img /> element.
   */
  imageList: string[];
}

const Slider: React.FC<SliderProps> = (props) => {
  const { isInfinite = true, imageList, ...remainingProps } = props;
  const [currentImage, setCurrentImage] = React.useState(0);
  const [incrementDisabled, setIncrementDisabled] = React.useState(
    isInfinite && imageList.length <= 1
  );
  const [decrementDisabled, setDecrementDisabled] = React.useState(!isInfinite);

  const incrementImage = () => {
    let newValue = currentImage + 1;

    if (!isInfinite) {
      setIncrementDisabled(currentImage + 1 === imageList.length - 1);
    } else {
      newValue = currentImage === imageList.length - 1 ? 0 : currentImage + 1;
    }

    if (decrementDisabled) {
      setDecrementDisabled(false);
    }
    setCurrentImage(newValue);
  };

  const decrementImage = () => {
    let newValue = currentImage - 1;

    if (!isInfinite) {
      setDecrementDisabled(currentImage - 1 === 0);
    } else {
      newValue = currentImage === 0 ? imageList.length - 1 : currentImage - 1;
    }

    if (incrementDisabled) {
      setIncrementDisabled(false);
    }
    setCurrentImage(newValue);
  };

  return (
    <div className="slider" {...remainingProps}>
      <div className="button-container button-container-left">
        <Button
          orientation="left"
          isDisabled={decrementDisabled}
          onClick={decrementImage}
        />
      </div>
      <div className="slider-content">{imageList[currentImage]}</div>
      <div className="button-container button-container-right">
        <Button
          orientation="right"
          isDisabled={incrementDisabled}
          onClick={incrementImage}
        />
      </div>
    </div>
  );
};

export default Slider;
