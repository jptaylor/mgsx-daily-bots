import React from "react";

import { Alert } from "./ui/alert";
import { Button } from "./ui/button";

export type SplashProps = {
  onReady: () => void;
  ready: boolean;
};

const Splash: React.FC<SplashProps> = ({ onReady, ready = false }) => {
  return (
    <div className="w-full h-full flex items-center">
      <div className="animate-fadeIn relative max-w-2xl mx-auto flex flex-col items-center gap-8 p-8">
        <Alert intent="danger" title="MGSX Codec Daily Bots Demo">
          This a tech demo, not a real product. Metal Gear Solid, all characters
          and sounds are property of Konami Digital Entertainment or their
          respective owners.
        </Alert>
        <Button
          variant="ghost"
          disabled={!ready}
          onClick={() => ready && onReady()}
          className="animate-pulse"
        >
          {ready ? "Press Start" : "Loading assets..."}
        </Button>
      </div>
    </div>
  );
};

export default Splash;
