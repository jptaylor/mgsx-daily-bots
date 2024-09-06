import React from "react";

interface FooterProps {
  // Define your component props here
  handleDisconnect: () => void;
}

const Footer: React.FC<FooterProps> = ({ handleDisconnect }) => {
  return (
    <footer className="flex flex-row w-full items-center justify-end mt-auto gap-6">
      <button>Pixelate on</button>
      <button onClick={() => handleDisconnect()}>Disconnect</button>
    </footer>
  );
};

export default Footer;
