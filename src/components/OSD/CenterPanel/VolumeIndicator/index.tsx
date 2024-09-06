import React, { useContext, useEffect, useState } from "react";
import { useDebounce } from "@uidotdev/usehooks";
import { VoiceEvent } from "realtime-ai";
import { useVoiceClientEvent } from "realtime-ai-react";

import { AppContext } from "@/context";

import styles from "./styles.module.css";

const SVG = ({ volume = "0" }: { volume: string }) => (
  <svg
    width="682"
    height="397"
    viewBox="0 0 682 397"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={styles.bars}
    data-vol={volume}
  >
    <path d="M0 0H682V36H0V0Z" />
    <path d="M476 46H0V83H326V74H359V64H403V56H476V46Z" />
    <path d="M269 93H0V130H215V121H232V111H251V103H269V93Z" />
    <path d="M188 140H0V177H161V168H171V158H179V150H188V140Z" />
    <path d="M0 187H150V197H143V214H134V223H0V187Z" />
    <path d="M124 233H0V269H115V249H124V233Z" />
    <path d="M107 279H0V315H98V304H107V279Z" />
    <path d="M98 325H0V361H89V343H98V325Z" />
    <path d="M89 371H0V397H80V387H89V371Z" />
  </svg>
);

const VolumeIndicator: React.FC = () => {
  const { isCalling } = useContext(AppContext);
  const [volume, setVolume] = useState<number>(0);
  const debouncedVolume = useDebounce(volume, 50);

  useEffect(() => {
    setVolume(0);
  }, [isCalling]);

  useVoiceClientEvent(VoiceEvent.RemoteAudioLevel, (level) => {
    if (level > 0.001) {
      const v = Math.floor(Number(level) * 100);
      setVolume(Math.min(Math.max(v, 0), 9));
    }
  });

  return (
    <div className={styles.volumeIndicator}>
      <SVG volume={debouncedVolume.toString()} />
    </div>
  );
};

export default VolumeIndicator;
