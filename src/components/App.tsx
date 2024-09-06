import { useEffect, useState } from "react";
import { LLMHelper } from "realtime-ai";
import { DailyVoiceClient } from "realtime-ai-daily";
import { VoiceClientAudio, VoiceClientProvider } from "realtime-ai-react";

import { AppProvider } from "@/context";
import { config, services, timeout } from "@/rtvi.config";

import Session from "./Session";

export default function App() {
  const [voiceClient, setVoiceClient] = useState<DailyVoiceClient | null>(null);

  useEffect(() => {
    if (voiceClient) {
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

  if (!voiceClient) {
    return <div>Loading...</div>;
  }

  return (
    <VoiceClientProvider voiceClient={voiceClient}>
      <AppProvider>
        <Session />
      </AppProvider>
      <VoiceClientAudio />
    </VoiceClientProvider>
  );
}
