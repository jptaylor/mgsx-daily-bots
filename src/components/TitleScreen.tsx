import React, { useContext, useEffect, useState } from "react";
import Image from "next/image";
import { useVoiceClient } from "realtime-ai-react";

import Logo from "@/assets/logo.svg";
import { AppContext } from "@/context";
import { usePlayCodecSound } from "@/hooks/usePlayCodecSound";

import { Button } from "./ui/button";
import { Switch } from "./ui/switch";
import DeviceSelect from "./DeviceSelect";

interface TitleScreenProps {
  handleStart: () => void;
}

const TitleScreen: React.FC<TitleScreenProps> = ({ handleStart }) => {
  const { pixelate, setPixelate } = useContext(AppContext);
  const [started, setStarted] = useState(false);
  const playCodecSound = usePlayCodecSound();
  const voiceClient = useVoiceClient()!;

  useEffect(() => {
    if (!voiceClient) return;
    voiceClient.initDevices();
  }, [voiceClient]);

  if (started) {
    return null;
  }

  return (
    <div className="relative bg-black w-full h-full flex flex-col justify-between items-center p-8">
      <div className="animate-fadeIn absolute inset-0 z-0 opacity-0">
        <div className="bg-[url(/bg.jpg)] bg-cover absolute inset-0 z-0 animate-bgFade" />
        <div className="bg-[url(/bg.jpg)] bg-[200%_200%] absolute inset-0 z-0 animate-bgScroll mix-blend-screen scale-[-1]" />
      </div>
      <header className="text-center relative z-1 ">
        <Image
          src={Logo}
          alt="Metal Gear Solid AI"
          className="opacity-0 animate-bgAppear mx-auto"
        />
      </header>
      <div className="animate-appear relative p-8  w-full max-w-lg z-2 before:content-[''] before:absolute before:inset-0 before:bg-black before:z-1 before:blur-3xl">
        <div className="relative z-2 flex flex-col gap-10">
          <p className="text-lg">
            Works best in a quiet environment with headphones
          </p>

          <DeviceSelect hideMeter={false} />

          <div className="flex flex-row items-center justify-between">
            Pixelate effect {pixelate}
            <Switch
              checked={pixelate}
              onCheckedChange={() => setPixelate(!pixelate)}
            />
          </div>

          <Button
            variant="ghost"
            className="self-center"
            onClick={() => {
              playCodecSound("gunshot");
              setStarted(true);

              setTimeout(() => {
                handleStart();
              }, 2000);
            }}
          >
            Begin mission
          </Button>
        </div>
      </div>
      <footer className="text-center relative z-1 text-xs md:text-sm opacity-50">
        Metal Gear Solid and all related content &copy; Konami Digital
        Entertainment
      </footer>
    </div>
  );
};

export default TitleScreen;
