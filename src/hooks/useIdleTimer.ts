import { useCallback, useContext, useEffect, useRef } from "react";
import { VoiceEvent } from "realtime-ai";
import { useVoiceClientEvent } from "realtime-ai-react";

import { AppContext } from "@/context";

export const useIdleTimer = () => {
  const { runIdleCheck, character } = useContext(AppContext);
  const idleTimerRef = useRef<NodeJS.Timeout | null>(null);

  const startTimer = useCallback(() => {
    idleTimerRef.current = setTimeout(() => {
      runIdleCheck();
    }, 1000 * 6.5);
  }, [runIdleCheck]);

  useEffect(() => {
    clearTimeout(idleTimerRef.current!);
  }, [character]);

  useVoiceClientEvent(
    VoiceEvent.BotStartedSpeaking,
    useCallback(() => {
      clearTimeout(idleTimerRef.current!);
    }, [])
  );

  useVoiceClientEvent(
    VoiceEvent.UserStartedSpeaking,
    useCallback(() => {
      clearTimeout(idleTimerRef.current!);
    }, [])
  );

  useVoiceClientEvent(
    VoiceEvent.BotStoppedSpeaking,
    useCallback(() => {
      startTimer();
    }, [startTimer])
  );

  useEffect(() => () => {
    clearTimeout(idleTimerRef.current!);
  });
};
