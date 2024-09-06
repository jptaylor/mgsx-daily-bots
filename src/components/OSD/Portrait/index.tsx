import React, { useEffect, useRef } from "react";
import Image, { StaticImageData } from "next/image";

import { usePlayCodecSound } from "@/hooks/usePlayCodecSound";

import { cn } from "../../../utils/tailwind";

import styles from "./styles.module.css";

const characterImageMap: { [key: string]: string } = {
  agent: "/agent_base.png",
  snake: "/snake_base.png",
  naomi: "/naomi_base.png",
  roy: "/roy_base.png",
  meryl: "/meryl_base.png",
  meiling: "/meiling_base.png",
  otacon: "/hal_base.png",
};

export type PortraitProps = {
  talking: boolean;
  character: string | null;
  isCalling?: boolean;
  isLocal?: boolean;
};

const Portrait: React.FC<PortraitProps> = React.memo(
  ({ character = "agent", talking, isLocal = false, isCalling = false }) => {
    const blinkTimer = useRef<NodeJS.Timeout | null>(null);
    const eyesRef = useRef<HTMLImageElement | null>(null);
    const mouthRef = useRef<HTMLImageElement | null>(null);
    const portraitRef = useRef<HTMLDivElement | null>(null);

    const playCodecSound = usePlayCodecSound();

    // Close portrait when calling
    useEffect(() => {
      if (!isCalling || isLocal || !character) return;

      // Switch to the new character
      portraitRef.current!.style.animationName = styles.close;
      playCodecSound("close");
    }, [isCalling, character, isLocal, playCodecSound]);

    useEffect(() => {
      if (!character || isLocal) return;

      playCodecSound("open");
      portraitRef.current!.style.animationName = styles.open;
    }, [character, isLocal, playCodecSound]);

    useEffect(() => {
      if (!character || !eyesRef.current) return;

      function runBlinkTimer() {
        blinkTimer.current = setTimeout(() => {
          if (!eyesRef.current) return;
          eyesRef.current!.style.animationName = styles.blink;
          runBlinkTimer();
        }, Math.random() * 2200 + 2000);
      }

      runBlinkTimer();
    }, [character]);

    useEffect(() => () => clearTimeout(blinkTimer.current!), []);

    return (
      <div className={styles.portrait} ref={portraitRef}>
        {character && (
          <>
            <div className={styles.flickerLarge} />
            <div className={styles.flickerSmall} />

            <Image
              priority
              src={characterImageMap[character]}
              className={styles.base}
              width={1248}
              height={712}
              alt=""
            />
            <Image
              priority
              src={characterImageMap[character]}
              className={styles.eyes}
              ref={eyesRef}
              onAnimationEnd={() => {
                if (character && eyesRef.current) {
                  eyesRef.current.style.animationName = "";
                }
              }}
              width={1248}
              height={712}
              alt=""
            />
            <Image
              priority
              src={characterImageMap[character]}
              className={cn(styles.mouth, talking && styles.talking)}
              ref={mouthRef}
              width={1248}
              height={712}
              alt=""
            />
          </>
        )}
      </div>
    );
  }
);

Portrait.displayName = "Portrait";

export default Portrait;
