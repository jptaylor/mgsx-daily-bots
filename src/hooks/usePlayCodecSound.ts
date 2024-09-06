import { useCallback } from "react";

export type Sound =
  | "open"
  | "close"
  | "call"
  | "freq"
  | "tray"
  | "entry"
  | "gunshot";
const SoundMap = {
  open: "/codecopen.wav",
  close: "/codecover.wav",
  call: "/codeccall.wav",
  freq: "/codecfreq.wav",
  tray: "/codecphonebook.wav",
  entry: "/codecphoneentry.wav",
  gunshot: "/gunshot.wav",
};

export const usePlayCodecSound = () => {
  return useCallback((sound: Sound) => {
    const audio = new Audio(SoundMap[sound]);
    audio.currentTime = 0;
    if (sound === "freq") {
      audio.volume = 0.45;
    }
    audio.play();
  }, []);
};
