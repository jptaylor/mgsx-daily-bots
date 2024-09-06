import React, { useCallback, useContext, useEffect, useRef } from "react";
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
  ["Oh-tah-kon", "Otacon"],
];

const Transcript: React.FC<Props> = ({ active }) => {
  const { isCalling, character } = useContext(AppContext);
  const [compiledTranscript, setCompiledTranscript] =
    React.useState<string>("");
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(
    () => () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    },
    []
  );

  useEffect(() => {
    setCompiledTranscript("");

    if (timeoutRef.current) clearTimeout(timeoutRef.current);
  }, [isCalling, character]);

  useVoiceClientEvent(
    VoiceEvent.BotStoppedSpeaking,
    useCallback(() => {
      timeoutRef.current = setTimeout(() => {
        setCompiledTranscript("");
      }, 2000);
    }, [])
  );

  useVoiceClientEvent(
    VoiceEvent.BotStartedSpeaking,
    useCallback(() => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    }, [])
  );

  useVoiceClientEvent(
    VoiceEvent.BotTranscript,
    useCallback((transcript: string) => {
      setCompiledTranscript((t) => t + " " + replaceWords(transcript));
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
