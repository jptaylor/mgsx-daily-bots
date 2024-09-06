import { useContext, useEffect, useState } from "react";
import { VoiceError } from "realtime-ai";
import {
  useVoiceClient,
  useVoiceClientTransportState,
} from "realtime-ai-react";

import { AppContext } from "@/context";
import { useIdleTimer } from "@/hooks/useIdleTimer";

import Footer from "./Footer";
import OSD from "./OSD";
import Phonebook from "./Phonebook";
import Pixelate from "./Pixelate";
import Transcript from "./Transcript";

export default function Sandbox() {
  const voiceClient = useVoiceClient()!;
  const transportState = useVoiceClientTransportState();

  const [error, setError] = useState<string | null>(null);
  const [appState, setAppState] = useState<
    "idle" | "ready" | "connecting" | "connected"
  >("idle");
  const { character, switchCharacter, runIdleCheck } = useContext(AppContext);
  const [showPhonebook, setShowPhonebook] = useState<boolean | undefined>(
    undefined
  );

  useIdleTimer();

  useEffect(() => {
    // Update app state based on voice client transport state.
    // We only need a subset of states to determine the ui state,
    // so this effect helps avoid excess inline conditionals.
    switch (transportState) {
      case "initialized":
        setAppState("ready");
        break;
      case "authenticating":
      case "connecting":
        setAppState("connecting");
        break;
      case "connected":
      case "ready":
        setAppState("connected");
        break;
      default:
        setAppState("idle");
    }
  }, [transportState]);

  async function start() {
    if (!voiceClient) return;

    // Join the session
    try {
      // Disable the mic until the bot has joined
      // to avoid interrupting the bot's welcome message
      voiceClient.enableMic(false);
      await voiceClient.start();
    } catch (e) {
      setError((e as VoiceError).message || "Unknown error occured");
      voiceClient.disconnect();
    }
  }

  async function disconnect() {
    await voiceClient.disconnect();
  }

  return (
    <div className="flex flex-col h-full items-center w-full">
      <Pixelate />

      <OSD
        handleTogglePhonebook={() => {
          setShowPhonebook(!showPhonebook);
        }}
        handleSwitchCharacter={(character) => {
          switchCharacter(character);
        }}
      />
      <Transcript active={!showPhonebook} />
      <Phonebook active={showPhonebook} />
      <Footer handleDisconnect={() => disconnect()} />
    </div>
  );
}
