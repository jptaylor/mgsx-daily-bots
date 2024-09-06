import React, { useEffect, useState } from "react";
import Image from "next/image";

import CallImage from "@/assets/call.png";
import ConnectingText from "@/assets/connecting_text.svg";
import { usePlayCodecSound } from "@/hooks/usePlayCodecSound";
import { cn } from "@/utils/tailwind";

interface Props {
  state: string;
}

const CallNotification: React.FC<Props> = ({ state }) => {
  const playCodecSound = usePlayCodecSound();
  const [animationEnd, setAnimationEnd] = useState(false);

  useEffect(() => {
    if (!playCodecSound) return;

    playCodecSound("call");
  }, [playCodecSound]);

  return (
    <div className="flex flex-col items-center">
      <Image
        src={CallImage}
        alt="Call"
        width={580}
        height={120}
        className="animate-appear w-[200px] h-[42px]"
        onAnimationEnd={() => setAnimationEnd(true)}
      />
      <Image
        src={ConnectingText}
        alt="connecting text"
        width={650}
        height={50}
        className={cn(
          "opacity-0 animate-pulse w-auto h-[12px]",
          animationEnd && "opacity-1"
        )}
      />
    </div>
  );
};

export default CallNotification;
