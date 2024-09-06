import React, { useEffect, useRef } from "react";
import Image, { StaticImageData } from "next/image";

import { usePlayCodecSound } from "@/hooks/usePlayCodecSound";

import { cn } from "../../../utils/tailwind";

import AgentBase from "./assets/agent_base.png";
import OtaconBase from "./assets/hal_base.png";
import MeilingBase from "./assets/meiling_base.png";
import MerylBase from "./assets/meryl_base.png";
import NaomiBase from "./assets/naomi_base.png";
import RoyBase from "./assets/roy_base.png";
import SnakeBase from "./assets/snake_base.png";

import styles from "./styles.module.css";

const characterImageMap: { [key: string]: StaticImageData } = {
  agent: AgentBase,
  snake: SnakeBase,
  naomi: NaomiBase,
  roy: RoyBase,
  meryl: MerylBase,
  meiling: MeilingBase,
  otacon: OtaconBase,
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
              alt=""
            />
            <Image
              priority
              src={characterImageMap[character]}
              className={cn(styles.mouth, talking && styles.talking)}
              ref={mouthRef}
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
