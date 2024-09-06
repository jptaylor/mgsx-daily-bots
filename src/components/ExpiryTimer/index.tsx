import React, { useCallback, useEffect, useState } from "react";
import { VoiceEvent } from "realtime-ai";
import { useVoiceClient, useVoiceClientEvent } from "realtime-ai-react";

import { cn } from "@/utils/tailwind";

import styles from "./styles.module.css";
const SVG = ({ num = "0" }: { num: string }) => (
  <svg
    width="77"
    height="148"
    viewBox="0 0 77 148"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={styles.number}
    data-num={num}
  >
    <path d="M9 0L18.7938 14H59L69 0H9Z" />
    <path d="M77 8L63 17.7938L63 58L77 68V8Z" />
    <path d="M77 79L63 88.7938L63 129L77 139V79Z" />
    <path d="M0 139L14 129.206L14 89L7.15493e-07 79L0 139Z" />
    <path d="M0 67L14 57.2062L14 17L7.15493e-07 7L0 67Z" />
    <path d="M69 76L59.2062 62L19 62L9 76L69 76Z" />
    <path d="M69 148L59.2062 134H19L9 148H69Z" />
  </svg>
);

const DotSVG = () => (
  <svg
    width="18"
    height="18"
    viewBox="0 0 18 18"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={styles.dot}
  >
    <rect width="18" height="18" />
  </svg>
);

const ExpiryTimer: React.FC = () => {
  const voiceClient = useVoiceClient();
  const [exp, setExp] = useState<number | undefined>(undefined);
  const [time, setTime] = useState({ minutes: 0, seconds: 0 });

  useEffect(() => {
    if (!voiceClient) return;
    setExp(voiceClient?.transportExpiry);
  }, [voiceClient]);

  useVoiceClientEvent(
    VoiceEvent.Disconnected,
    useCallback(() => {
      setExp(undefined);
      setTime({ minutes: 0, seconds: 0 });
    }, [])
  );

  const noExpiry = !exp || exp === 0;

  useEffect(() => {
    if (noExpiry) return;

    const futureTimestamp = exp;

    // Function to update time
    const updateTime = () => {
      if (noExpiry) clearInterval(interval);
      const currentTimestamp = Math.floor(Date.now() / 1000);
      const differenceInSeconds = futureTimestamp! - currentTimestamp;
      const minutes = Math.floor(differenceInSeconds / 60);
      const seconds = differenceInSeconds % 60;
      setTime({ minutes, seconds });
    };

    // Update time every second
    const interval = setInterval(updateTime, 1000);

    // Initial update
    updateTime();

    // Clear interval on component unmount
    return () => clearInterval(interval);
  }, [noExpiry, exp]);

  //if (noExpiry) return null;

  const isExpired = time.minutes <= 0 && time.seconds <= 0;
  const seconds = isExpired ? "00" : time.seconds.toString().padStart(2, "0");
  const minutes = isExpired ? "00" : time.minutes.toString().padStart(2, "0");

  const timeRemaining = `${minutes}.${seconds}`.split("");

  return (
    <div className={styles.container}>
      <div className={styles.label}>Mission time remaining</div>
      <div className={cn("animate-pulse", styles.numbers)}>
        {timeRemaining.map((num, i) =>
          num === "." ? <DotSVG key={i} /> : <SVG key={i} num={num} />
        )}
      </div>
    </div>
  );
};

export default ExpiryTimer;
