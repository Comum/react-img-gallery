import * as React from "react";
import "./ImageViewer.scss";

interface ImageViewerProps {
  className?: string;

  children?: React.ReactNode;

  /**
   * Index of the visible image.
   *
   * @default 0
   */
  currentImageIndex?: number;

  /**
   * Controls whether the scroll animation should happen.
   *
   * @default true
   */
  isTransitionEnabled?: boolean;

  onTransitionEnd?: () => void;
}

interface ImageProps {
  className?: string;

  source: string;
}

const Image: React.FC<ImageProps> = (props) => {
  const { source, className, ...remainingProps } = props;
  const classList = `image-preview ${className ? className : ""}`;

  return <img className={classList} src={source} {...remainingProps} />;
};

const ImageViewer: React.FC<ImageViewerProps> = (props) => {
  const {
    currentImageIndex = 0,
    children,
    isTransitionEnabled = true,
    onTransitionEnd,
    ...remainingProps
  } = props;

  return (
    <div
      className="image-viewer"
      style={{
        transform: `translateX(-${currentImageIndex * 100}%)`,
        transition: !isTransitionEnabled ? "none" : undefined,
      }}
      onTransitionEnd={onTransitionEnd}
      {...remainingProps}
    >
      {children}
    </div>
  );
};

export { Image, ImageViewer };
