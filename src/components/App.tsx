import { useEffect, useRef, useState } from "react";
import { Loader2 } from "lucide-react";
//@ts-expect-error - Preload is not typed
import Preload from "preload-it";
import { LLMHelper } from "realtime-ai";
import { DailyVoiceClient } from "realtime-ai-daily";
import { VoiceClientAudio, VoiceClientProvider } from "realtime-ai-react";

import { AppProvider } from "@/context";
import { config, services, timeout } from "@/rtvi.config";

import Pixelate from "./Pixelate";
import Sandbox from "./Sandbox";
import Session from "./Session";
import Splash from "./Splash";

const assets = [
  "/codeccall.wav",
  "/codecfreq.wav",
  "/codecopen.wav",
  "/codecover.wav",
  "/codecphonebook.wav",
  "/codecphoneentry.wav",
  "/zip.wav",
  "/gunshot.wav",
  "/music.mp3",
  "/agent_base.png",
  "/hal_base.png",
  "/meiling_base.png",
  "/meryl_base.png",
  "/naomi_base.png",
  "/roy_base.png",
  "/snake_base.png",
  "/bg.jpg",
];

export default function App() {
  const mountedRef = useRef(false);
  const [assetsLoaded, setAssetsLoaded] = useState(false);
  const [showSplash, setShowSplash] = useState(true);
  const [voiceClient, setVoiceClient] = useState<DailyVoiceClient | null>(null);

  useEffect(() => {
    if (voiceClient || !mountedRef.current) {
      return;
    }

    const vc = new DailyVoiceClient({
      baseUrl: process.env.NEXT_PUBLIC_BASE_URL || "/api",
      services,
      config,
      timeout,
    });

    vc.registerHelper("llm", new LLMHelper({}));

    setVoiceClient(vc);
  }, [voiceClient]);

  useEffect(() => {
    if (mountedRef.current) {
      return;
    }

    mountedRef.current = true;

    const preloader = Preload();

    preloader.fetch(assets).then(() => {
      setAssetsLoaded(true);
    });
  }, []);

  if (!voiceClient) {
    return (
      <div>
        <Loader2 className="animate-spin" />
      </div>
    );
  }

  return (
    <VoiceClientProvider voiceClient={voiceClient}>
      <AppProvider>
        <Pixelate />

        {showSplash ? (
          <Splash onReady={() => setShowSplash(false)} ready={assetsLoaded} />
        ) : (
          <Session />
        )}
      </AppProvider>
      <VoiceClientAudio />
    </VoiceClientProvider>
  );
}
