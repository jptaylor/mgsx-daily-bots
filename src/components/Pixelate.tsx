import React from "react";

interface PixelateProps {}

const Pixelate: React.FC<PixelateProps> = () => {
  //if (!ui?.pixelate) return null;

  return (
    <svg xmlns="http://www.w3.org/2000/svg" version="1.1" width="0" height="0">
      <defs>
        <filter id="pixelate" x="0" y="0">
          <feFlood x="2" y="2" height="1" width="1" />
          <feComposite width="1.5" height="1.5" />
          <feTile result="a" />
          <feComposite in="SourceGraphic" in2="a" operator="in" />
          <feMorphology operator="dilate" radius="0.5" />
        </filter>
      </defs>
    </svg>
  );
};

export default Pixelate;
