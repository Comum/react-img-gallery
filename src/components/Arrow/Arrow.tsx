import * as React from "react";

import "./Arrow.scss";

interface ArrowProps {
  className?: string;

  /**
   * Orientation of the arrow.
   *
   * @default left
   */
  orientation: "right" | "left";

  /**
   * Fucntion to run when the arrow is clicked
   */
  onClick: () => void;
}

const Arrow: React.FC<ArrowProps> = (props) => {
  const { orientation = "left", className, onClick, ...remainingProps } = props;
  const buttonClassList = `button ${className}`;
  const arrowClassList = `arrow arrow-${orientation}`;

  return (
    <button className={buttonClassList} {...remainingProps} onClick={onClick}>
      <div className={arrowClassList}></div>
    </button>
  );
};

export { Arrow };
