import React, { useCallback, useContext, useEffect } from "react";
import { VoiceEvent } from "realtime-ai";
import { useVoiceClientEvent } from "realtime-ai-react";

import { AppContext } from "@/context";
import { cn } from "@/utils/tailwind";

type Props = {
  active: boolean;
};

const TRANSCRIPT_REPLACE = [
  ["Snayk", "Snake"],
  ["Fahks-Hownd", "Fox Hound"],
  ["Oh-tuh-kon", "Otacon"],
];

const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

const Transcript: React.FC<Props> = ({ active }) => {
  const { isCalling, character } = useContext(AppContext);
  const [compiledTranscript, setCompiledTranscript] =
    React.useState<string>("");

  useEffect(() => {
    setCompiledTranscript("");
  }, [isCalling, character]);

  useVoiceClientEvent(
    VoiceEvent.BotStoppedSpeaking,
    useCallback(async () => {
      await delay(2000);
      setCompiledTranscript("");
    }, [])
  );

  useVoiceClientEvent(
    VoiceEvent.BotTranscript,
    useCallback((transcript: string) => {
      setCompiledTranscript((t) => t + " " + replaceWords(transcript));
      //setCurrentTranscript(replaceWords(transcript));
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
      <p className="text-3xl leading-relaxed">{compiledTranscript}</p>
    </div>
  );
};

export default Transcript;
