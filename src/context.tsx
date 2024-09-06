import React, { createContext, ReactNode, useCallback, useState } from "react";
import { LLMContext, LLMContextMessage, LLMHelper } from "realtime-ai";
import { useVoiceClient } from "realtime-ai-react";

import { usePlayCodecSound } from "./hooks/usePlayCodecSound";
import {
  CharacterEnum,
  CHARACTERS,
  IDLE_PROMPT,
  RETURN_PROMPT,
} from "./rtvi.config";

type CharacterMessageHistory = {
  [character: string]: LLMContextMessage[];
};

const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

interface AppContextType {
  character: CharacterEnum | null;
  setCharacter: (newCharacter: CharacterEnum) => void;
  localCharacter: CharacterEnum;
  setLocalCharacter: (newCharacter: CharacterEnum) => void;
  messageHistory: CharacterMessageHistory;
  setMessageHistory: (messageHistory: CharacterMessageHistory) => void;
  getCurrentContext: () => Promise<LLMContext>;
  switchCharacter: (newCharacter: CharacterEnum) => Promise<CharacterEnum>;
  runIdleCheck: () => void;
  callFrequency: (frequency: number) => void;
  currentFrequency: number;
  setCurrentFrequency: (frequency: number) => void;
  discoveredFrequencies: CharacterEnum[];
  isCalling: boolean;
  setIsCalling: (isCalling: boolean) => void;
}

export const AppContext = createContext<AppContextType>({
  character: CharacterEnum.Snake,
  setCharacter: () => {
    throw new Error("setCharacter function must be overridden");
  },
  localCharacter: CharacterEnum.Agent,
  setLocalCharacter: () => {
    throw new Error("setLocalCharacter function must be overridden");
  },
  messageHistory: {},
  setMessageHistory: () => {
    throw new Error("setCurrentMessages function must be overridden");
  },
  getCurrentContext: () => {
    throw new Error("getCurrentContext function must be overridden");
  },
  switchCharacter: () => {
    throw new Error("switchCharacter function must be overridden");
  },
  runIdleCheck: () => {
    throw new Error("runIdleCheck function must be overridden");
  },
  callFrequency: () => {
    throw new Error("callFrequency function must be overridden");
  },
  currentFrequency: 1.15,
  setCurrentFrequency: () => {
    throw new Error("setCurrentFrequency function must be overridden");
  },
  discoveredFrequencies: [],
  isCalling: false,
  setIsCalling: () => {
    throw new Error("setIsCalling function must be overridden");
  },
});
AppContext.displayName = "AppContext";

type AppContextProps = {
  children: ReactNode;
};

export const AppProvider: React.FC<
  React.PropsWithChildren<AppContextProps>
> = ({ children }) => {
  const voiceClient = useVoiceClient()!;

  const [character, setCharacter] = useState<CharacterEnum | null>(
    CharacterEnum.Snake
  );
  const [localCharacter, setLocalCharacter] = useState<CharacterEnum>(
    CharacterEnum.Agent
  );
  const [messageHistory, setMessageHistory] = useState<CharacterMessageHistory>(
    {}
  );
  const [isCalling, setIsCalling] = useState<boolean>(false);
  const [currentFrequency, setCurrentFrequency] = useState<number>(1.15);
  const [discoveredFrequencies, setDiscoveredFrequency] = useState<
    CharacterEnum[]
  >([
    CharacterEnum.Snake,
    CharacterEnum.Naomi,
    CharacterEnum.Roy,
    CharacterEnum.MeiLing,
  ]);

  const playCodecSound = usePlayCodecSound();

  const getCurrentContext = useCallback(async (): Promise<LLMContext> => {
    const llmHelper = voiceClient.getHelper("llm") as LLMHelper;
    const ctx = await llmHelper.getContext();
    return ctx;
  }, [voiceClient]);

  const switchCharacter = useCallback(
    async (newCharacter: CharacterEnum): Promise<CharacterEnum> => {
      if (newCharacter === character || !voiceClient) {
        return newCharacter;
      }

      setIsCalling(true);

      if (voiceClient.state !== "ready") {
        setTimeout(() => setIsCalling(false), 1000);
        return newCharacter;
      }

      // Get and store the current context for this character
      const llmHelper = voiceClient.getHelper("llm") as LLMHelper;
      const ctx = await llmHelper.getContext();

      if (character) {
        setMessageHistory((prev) => ({
          ...prev,
          [character]: ctx.messages as LLMContextMessage[],
        }));
      }

      // Get from history or create LLM context for character if it doesn't exist
      const newCtx: LLMContextMessage[] = messageHistory[newCharacter] || [
        {
          role: "system",
          content: CHARACTERS.find((c) => c.name === newCharacter)?.prompt,
        },
      ];

      // Create new config object for character
      const newConfig = voiceClient.setConfigOptions([
        {
          service: "tts",
          options: [
            {
              name: "voice",
              value: CHARACTERS.find((c) => c.name === newCharacter)?.voice_id,
            },
          ],
        },
        {
          service: "llm",
          options: [
            {
              name: "initial_messages",
              value: [...newCtx, ...(newCtx.length > 1 ? [RETURN_PROMPT] : [])],
            },
          ],
        },
      ]);

      // Update voice client config with the new character config
      try {
        await voiceClient.updateConfig(newConfig, true);
      } catch (e) {
        throw new Error("Error updating voice client config");
      }

      return newCharacter;
    },
    [voiceClient, messageHistory, character]
  );

  const runIdleCheck = useCallback(() => {
    if (!voiceClient || !character) {
      return;
    }

    console.debug("Running idle check for " + character);

    const llmHelper = voiceClient.getHelper("llm") as LLMHelper;
    llmHelper.appendToMessages(IDLE_PROMPT, true);
  }, [voiceClient, character]);

  const callFrequency = useCallback(
    async (frequency: number) => {
      if (!voiceClient) return;

      console.debug("Calling frequency " + frequency);

      // Find character in CHARACTERS array
      const newCharacter = CHARACTERS.find(
        (c) => c.frequency === frequency.toFixed(2)
      );

      if (newCharacter?.name === character) {
        console.debug("Already connected");
        return;
      }

      setCurrentFrequency(frequency);

      // Interrupt bot
      if (voiceClient.state === "ready") {
        await voiceClient.action({
          service: "tts",
          action: "interrupt",
          arguments: [],
        });
      }

      setIsCalling(true);

      console.debug("Calling " + newCharacter?.name);

      await delay(1000);
      playCodecSound("call");
      await delay(1000);

      if (!newCharacter) {
        setCharacter(null);
        setIsCalling(false);
        return false;
      }

      switchCharacter(newCharacter.name);

      // Change state to new character
      setCharacter(newCharacter.name);
      setIsCalling(false);

      // Check if we have discovered this frequency before
      if (!discoveredFrequencies.includes(newCharacter.name)) {
        // Add character to discovered frequencies
        console.debug("Discovered frequency for " + newCharacter.name);
        setDiscoveredFrequency((prev) => [...prev, newCharacter.name]);
      }
    },
    [
      discoveredFrequencies,
      switchCharacter,
      character,
      playCodecSound,
      voiceClient,
    ]
  );

  return (
    <AppContext.Provider
      value={{
        character,
        setCharacter,
        localCharacter,
        setLocalCharacter,
        messageHistory,
        setMessageHistory,
        getCurrentContext,
        switchCharacter,
        runIdleCheck,
        callFrequency,
        discoveredFrequencies,
        setIsCalling,
        isCalling,
        currentFrequency,
        setCurrentFrequency,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};
