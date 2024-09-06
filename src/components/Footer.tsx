import React, { useContext } from "react";

import { AppContext } from "@/context";

interface FooterProps {
  // Define your component props here
  handleDisconnect: () => void;
}

const Footer: React.FC<FooterProps> = ({ handleDisconnect }) => {
  const { pixelate, setPixelate } = useContext(AppContext);

  return (
    <footer className="flex flex-row w-full items-center justify-end mt-auto gap-6">
      <button onClick={() => setPixelate(!pixelate)}>
        Pixelate {pixelate ? "on" : "off"}
      </button>
      <button onClick={() => handleDisconnect()}>Disconnect</button>
    </footer>
  );
};

export default Footer;
