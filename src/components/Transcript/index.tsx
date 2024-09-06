import React, { useCallback } from "react";
import { VoiceEvent } from "realtime-ai";
import { useVoiceClientEvent } from "realtime-ai-react";

import { cn } from "@/utils/tailwind";

type Props = {
  active: boolean;
};

const TRANSCRIPT_REPLACE = [
  ["Snayk", "Snake"],
  ["Fahks-Hownd", "Fox Hound"],
];

const Transcript: React.FC<Props> = ({ active }) => {
  const [currentTranscript, setCurrentTranscript] = React.useState<string>("");

  useVoiceClientEvent(
    VoiceEvent.BotTranscript,
    useCallback((transcript: string) => {
      setCurrentTranscript(replaceWords(transcript));
    }, [])
  );

  const replaceWords = (transcript: string) => {
    let newTranscript = transcript;
    TRANSCRIPT_REPLACE.forEach(([from, to]) => {
      newTranscript = newTranscript.replace(new RegExp(from, "g"), to);
    });
    return newTranscript;
  };

  return (
    <div
      className={cn(
        "flex-1 w-full max-w-4xl h-full flex flex-col items-center pt-20",
        !active && "hidden"
      )}
    >
      <p className="text-3xl leading-relaxed">{currentTranscript}</p>
    </div>
  );
};

export default Transcript;
