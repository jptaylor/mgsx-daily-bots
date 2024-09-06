import { VoiceClientConfigOption, VoiceClientServices } from "realtime-ai";

// -- Character config

export enum CharacterEnum {
  Agent = "agent",
  Snake = "snake",
  Meryl = "meryl",
  Otacon = "otacon",
  MeiLing = "meiling",
  Naomi = "naomi",
  Roy = "roy",
}

export type Character = {
  name: CharacterEnum;
  voice_id: string;
  prompt: string;
  frequency: string;
};

const BASE_PROMPT: string = `
  Anytime you output "Fox Hound", output it phonetically as "Fahks-Hownd."
  Anytime you output "Snake", output it phonetically as "Snayk."
  My name is Agent Unknown, refer to me as Agent. Talk to me in character. 
  Your output will be converted to audio so don't include special characters in your answers. 
  Keep your responses brief. Start by briefly introducing yourself in character (in one sentence), and ask me a question.
  `;

export const RETURN_PROMPT = {
  role: "user",
  content:
    "Ask me to continue the conversation, act like I was away briefly but came back.",
};

export const IDLE_PROMPT = {
  role: "system",
  content:
    "Ask the user if they are still there and try to prompt for some input, but be short.",
};

export const CHARACTERS: Character[] = [
  {
    name: CharacterEnum.Snake,
    voice_id: "1ed6bddd-8437-48b8-afe2-5a713cdbf7a2",
    prompt: `Your name is Solid Snake, from Metal Gear Solid. You work for a government agency called 'Fox Hound'. ${BASE_PROMPT}`,
    frequency: "0.15",
  },
  {
    name: CharacterEnum.Meryl,
    voice_id: "34f08c6e-b836-4f8e-8a90-189203298251",
    prompt: `Your name is Meryl Silverburgh, a soldier from Metal Gear Solid. You work for a government agency called 'Fox Hound'. ${BASE_PROMPT}`,
    frequency: "0.48",
  },
  {
    name: CharacterEnum.MeiLing,
    voice_id: "34f08c6e-b836-4f8e-8a90-189203298251",
    prompt: `Your name is Mei Ling, a support operative from Metal Gear Solid. You work for a government agency called 'Fox Hound'. ${BASE_PROMPT}`,
    frequency: "0.85",
  },
  {
    name: CharacterEnum.Naomi,
    voice_id: "a7d5f6f8-399a-4c6a-98f0-2a6ec36d706d",
    prompt: `Your name is Naomi Hunter, a scientist from Metal Gear Solid. You work for a government agency called 'Fox Hound'. ${BASE_PROMPT}`,
    frequency: "0.96",
  },
  {
    name: CharacterEnum.Roy,
    voice_id: "34f08c6e-b836-4f8e-8a90-189203298251",
    prompt: `Your name is Roy Campbell, a mission briefing operative from Metal Gear Solid. You work for a government agency called 'Fox Hound'. ${BASE_PROMPT}`,
    frequency: "1.80",
  },
  {
    name: CharacterEnum.Otacon,
    voice_id: "34f08c6e-b836-4f8e-8a90-189203298251",
    prompt: `Your name is Otacon, a technical suppoert operative from Metal Gear Solid. You work for a government agency called 'Fox Hound'. ${BASE_PROMPT}`,
    frequency: "1.98",
  },
];

// -- RTVI config

export const timeout: number = 15 * 1000;
export const bot_profile = "voice_2024_08";
export const max_duration = 600;

export const services: VoiceClientServices = {
  tts: "cartesia",
  llm: "together",
};

export const config: VoiceClientConfigOption[] = [
  { service: "vad", options: [{ name: "params", value: { stop_secs: 0.3 } }] },
  {
    service: "tts",
    options: [
      { name: "voice", value: CHARACTERS[0].voice_id },
      { name: "model", value: "sonic-english" },
    ],
  },
  {
    service: "llm",
    options: [
      { name: "model", value: "meta-llama/Meta-Llama-3.1-70B-Instruct-Turbo" },
      {
        name: "initial_messages",
        value: [
          {
            role: "system",
            content: CHARACTERS[0].prompt,
          },
        ],
      },
      { name: "run_on_config", value: true },
    ],
  },
];
