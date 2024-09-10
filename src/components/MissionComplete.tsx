import React, { useEffect, useRef } from "react";
import { useVoiceClientEvent } from "realtime-ai-react";

import { usePlayCodecSound } from "@/hooks/usePlayCodecSound";

import { Button } from "./ui/button";

export type MissionCompleteProps = {
  onContinue: () => void;
};

const MissionComplete: React.FC<MissionCompleteProps> = ({ onContinue }) => {
  const mountedRef = useRef(false);
  const playCodecSound = usePlayCodecSound();

  useEffect(() => {
    if (mountedRef.current) return;
    mountedRef.current = true;

    playCodecSound("gameover");
  }, [playCodecSound]);

  return (
    <div className="w-full h-full flex items-center">
      <div className="animate-fadeIn relative max-w-2xl mx-auto flex flex-col items-center gap-8 p-8">
        Congratulations! You completed the mission.
        <Button
          variant="ghost"
          onClick={() => {
            onContinue();
          }}
          className="animate-pulse"
        >
          Start new game
        </Button>
      </div>
    </div>
  );
};

export default MissionComplete;
