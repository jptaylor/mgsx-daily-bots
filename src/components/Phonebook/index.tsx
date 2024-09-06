import React, { useContext, useEffect, useRef } from "react";

import { AppContext } from "@/context";
import { usePlayCodecSound } from "@/hooks/usePlayCodecSound";
import { CHARACTERS } from "@/rtvi.config";
import { cn } from "@/utils/tailwind";

import NumberSVG, { DotSVG } from "../svgs/NumberSVG";

type PhonebookProps = {
  active: boolean | undefined;
};

const PhonebookFrequency: React.FC<{ frequency?: string | null }> = ({
  frequency,
}) => {
  return (
    <div className="leading-none bg-mgs-darkest text-mgs-dark flex flex-row justify-center items-center gap-1 w-24 h-6 group-hover:text-mgs-light">
      {!frequency ? (
        ""
      ) : (
        <>
          <NumberSVG number={1} className="h-[13px] w-auto" />
          <NumberSVG number={4} className="h-[13px] w-auto" />
          {frequency.split("").map((n, i) => {
            if (n === ".") {
              return <DotSVG key={i} className="h-[13px] w-auto opacity-60" />;
            }
            return (
              <NumberSVG
                key={i}
                number={Number(n)}
                className="h-[13px] w-auto"
              />
            );
          })}
        </>
      )}
    </div>
  );
};

type PhonebookEntryProps = {
  name: string;
  frequency: string;
  callFrequency: (frequency: number) => void;
  discovered: boolean;
};

const PhonebookEntry: React.FC<PhonebookEntryProps> = ({
  name,
  frequency,
  callFrequency,
  discovered,
}) => {
  const playCodecSound = usePlayCodecSound();
  return (
    <div className="border-1 border-b border-mgs-darkest pt-8 pb-1">
      <button
        className={cn(
          "group flex flex-row gap-3 items-center justify-center select-none",
          !discovered && "pointer-events-none"
        )}
        onMouseEnter={() => playCodecSound("entry")}
        onClick={() => {
          if (discovered) {
            callFrequency(Number(frequency));
          }
        }}
      >
        <PhonebookFrequency frequency={discovered ? frequency : null} />
        <span
          className={cn(
            "font-bold uppercase text-2xl tracking-widest text-mgs-dark group-hover:text-mgs-lightest group-hover:[text-shadow:_0_0_8px_#D7FDFC]",
            !discovered && "opacity-0"
          )}
        >
          {discovered ? name : "???"}
        </span>
      </button>
    </div>
  );
};

const Phonebook: React.FC<PhonebookProps> = ({ active }) => {
  const mounted = useRef<boolean>(false);
  const { discoveredFrequencies, callFrequency } = useContext(AppContext);
  const playCodecSound = usePlayCodecSound();

  useEffect(() => {
    if (!mounted.current || active === undefined) {
      mounted.current = true;
      return;
    }
    playCodecSound("tray");
  }, [playCodecSound, active]);

  return (
    <div
      className={cn(
        "w-full xl:max-w-7xl z-0 relative after:content-[''] after:absolute after:inset-0 after:top-[-40px] after:border after:border-mgs-darkest after:z-0 after:pointer-events-none",
        !active && "hidden"
      )}
    >
      <div className="w-full grid grid-cols-1 md:grid-cols-2 justify-between p-8 pt-2 h-[var(--codec-bottom-h)] overflow-y-scroll">
        {CHARACTERS.map((c) => (
          <PhonebookEntry
            key={c.name}
            name={c.name}
            frequency={c.frequency}
            callFrequency={callFrequency}
            discovered={discoveredFrequencies.includes(c.name)}
          />
        ))}
      </div>
    </div>
  );
};

export default Phonebook;
