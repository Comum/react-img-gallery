import * as React from "react";

import "./Button.scss";

interface ButtonProps {
  className?: string;

  /**
   * Orientation of the arrow.
   *
   * @default left
   */
  orientation: "right" | "left";

  /**
   * Determines if the button is disabled.
   *
   * @default false
   */
  isDisabled?: boolean;

  /**
   * Fucntion to run when the arrow is clicked
   */
  onClick: () => void;
}

const Button: React.FC<ButtonProps> = (props) => {
  const {
    orientation = "left",
    isDisabled = false,
    className,
    onClick,
    ...remainingProps
  } = props;
  const buttonClassList = React.useMemo(
    () => `button ${className ? className : ""}`,
    [className]
  );
  const arrowClassList = React.useMemo(() => `arrow arrow-${orientation}`, [
    orientation,
  ]);

  return (
    <button
      className={buttonClassList}
      disabled={isDisabled}
      onClick={onClick}
      {...remainingProps}
    >
      <div className={arrowClassList}></div>
    </button>
  );
};

export { Button };
