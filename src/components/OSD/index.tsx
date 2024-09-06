import React, { useContext, useEffect, useRef, useState } from "react";
import { VoiceEvent } from "realtime-ai";
import { useVoiceClientEvent } from "realtime-ai-react";

import { AppContext } from "@/context";
import { usePlayCodecSound } from "@/hooks/usePlayCodecSound";
import { CharacterEnum } from "@/rtvi.config";

import MemoryButton from "./OSDButtons/MemoryButton";
import PTTButton from "./OSDButtons/PTTButton";
import ArrowButton from "./ArrowButton";
import CenterPanel from "./CenterPanel";
import Portrait from "./Portrait";

import styles from "./styles.module.css";

type OSDProps = {
  handleTogglePhonebook: () => void;
  handleSwitchCharacter: (character: CharacterEnum) => void;
};

const OSD: React.FC<OSDProps> = ({
  handleTogglePhonebook,
  handleSwitchCharacter,
}) => {
  const { character, localCharacter, isCalling, currentFrequency } =
    useContext(AppContext);
  const [frequency, setFrequency] = useState<number>(1.15);
  const [botIsSpeaking, setBotIsSpeaking] = useState<boolean>(false);
  const [localIsSpeaking, setLocalIsSpeaking] = useState<boolean>(false);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const playCodecSound = usePlayCodecSound();

  useVoiceClientEvent(VoiceEvent.RemoteAudioLevel, (vol: number) => {
    setBotIsSpeaking(vol > 0.005);
  });

  useVoiceClientEvent(VoiceEvent.LocalAudioLevel, (vol: number) => {
    setLocalIsSpeaking(vol > 0.02);
  });

  useEffect(() => {
    setFrequency(currentFrequency);
  }, [currentFrequency]);

  function changeFrequency(up: boolean = false) {
    if (up) {
      if (frequency >= 2) {
        return setFrequency(0.0);
      }
      setFrequency((p) => (p += 0.01));
    } else {
      if (frequency <= 0) {
        return setFrequency(2.0);
      }
      setFrequency((p) => (p -= 0.01));
    }
  }

  function handleMouseDown(up: boolean = false) {
    playCodecSound("freq");
    changeFrequency(up);
    intervalRef.current = setInterval(() => {
      changeFrequency(up);
    }, 100);
  }

  function handleMouseUp() {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  }

  return (
    <div className={styles.container}>
      <div className={styles.inner}>
        <Portrait
          character={character}
          talking={botIsSpeaking}
          isCalling={isCalling}
        />
        <div className={styles.center}>
          <header className={styles.header}>
            <PTTButton active={!(isCalling || !character)} />
          </header>
          <div className={styles.controls}>
            <ArrowButton
              disabled={isCalling}
              onMouseDown={() => handleMouseDown()}
              onMouseUp={handleMouseUp}
              onMouseLeave={handleMouseUp}
            />
            <CenterPanel frequency={frequency} />
            <ArrowButton
              flipped
              disabled={isCalling}
              onMouseDown={() => handleMouseDown(true)}
              onMouseUp={handleMouseUp}
              onMouseLeave={handleMouseUp}
            />
          </div>
          <footer className={styles.footer}>
            <MemoryButton onClick={() => handleTogglePhonebook()} />
          </footer>
        </div>
        <Portrait
          character={localCharacter}
          talking={localIsSpeaking}
          isLocal={true}
        />
      </div>
    </div>
  );
};

export default OSD;
