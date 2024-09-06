import React, { useContext, useState } from "react";
import { useVoiceClient } from "realtime-ai-react";

import { AppContext } from "@/context";

import { Button } from "./ui/button";
import ExpiryTimer from "./ExpiryTimer";

interface FooterProps {
  // Define your component props here
  handleDisconnect: () => void;
}

const Footer: React.FC<FooterProps> = ({ handleDisconnect }) => {
  const { pixelate, setPixelate } = useContext(AppContext);
  const [muted, setMuted] = useState(false);
  const voiceClient = useVoiceClient();

  return (
    <footer className="flex flex-row w-full items-end justify-between mt-auto">
      <ExpiryTimer />
      <div className="flex flex-row gap-6 items-end">
        <Button
          variant="ghost"
          size="sm"
          onClick={() => setPixelate(!pixelate)}
        >
          Pixelate {pixelate ? "on" : "off"}
        </Button>
        <Button
          variant={muted ? "mute" : "ghost"}
          size="sm"
          onClick={() => {
            if (muted) {
              voiceClient?.enableMic(true);
            } else {
              voiceClient?.enableMic(false);
            }
            setMuted(!muted);
          }}
        >
          {muted ? "Unmute" : "Mute"}
        </Button>
        <Button
          variant="disconnect"
          size="sm"
          onClick={() => handleDisconnect()}
        >
          Disconnect
        </Button>
      </div>
    </footer>
  );
};

export default Footer;
