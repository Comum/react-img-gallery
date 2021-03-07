import * as React from "react";
import "./slider.scss";

import { Button } from "./components/Button";
import { Image, ImageViewer } from "./components/ImageViewer";

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
  const {
    isInfinite = true,
    imageList = [],
    className,
    ...remainingProps
  } = props;
  const [currentImage, setCurrentImage] = React.useState(isInfinite ? 1 : 0);
  const length = React.useMemo(() => imageList.length, [imageList]);
  const [incrementDisabled, setIncrementDisabled] = React.useState(
    isInfinite && length <= 1
  );
  const [decrementDisabled, setDecrementDisabled] = React.useState(!isInfinite);
  // @ts-ignore
  const [isTransitionEnabled, setIsTransitionEnabled] = React.useState(true);
  const classList = React.useMemo(
    () => `slider ${className ? className : ""}`,
    [className]
  );

  const incrementImage = () => {
    let newValue = currentImage + 1;

    if (!isInfinite) {
      setIncrementDisabled(currentImage + 1 === length - 1);
    } else {
      newValue = currentImage === length + 1 ? 1 : currentImage + 1;
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
      newValue = currentImage === 0 ? length - 1 : currentImage - 1;
    }

    if (incrementDisabled) {
      setIncrementDisabled(false);
    }
    setCurrentImage(newValue);
  };

  React.useEffect(() => {
    if (isInfinite && !isTransitionEnabled) {
      setIsTransitionEnabled(true);
    }
  }, [currentImage, isInfinite, length]);

  const handleTransitionEnd = () => {
    if (isInfinite) {
      if (currentImage === 0) {
        setIsTransitionEnabled(false);
        setCurrentImage(length);
      } else if (currentImage === length + 1) {
        setIsTransitionEnabled(false);
        setCurrentImage(1);
      }
    }
  };

  return imageList.length === 0 ? null : (
    <div className={classList} {...remainingProps}>
      <div className="button-container button-container-left">
        <Button
          orientation="left"
          isDisabled={decrementDisabled}
          onClick={decrementImage}
        />
      </div>
      <ImageViewer
        currentImageIndex={currentImage}
        isTransitionEnabled={isTransitionEnabled}
        onTransitionEnd={() => handleTransitionEnd()}
      >
        {isInfinite && <Image source={imageList[length - 1]} key={-1} />}
        {imageList.map((image, index) => (
          <Image source={image} key={index} />
        ))}
        {isInfinite && <Image source={imageList[0]} key={length} />}
      </ImageViewer>
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
