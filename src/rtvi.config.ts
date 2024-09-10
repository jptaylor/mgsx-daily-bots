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

const generateRandom3DigitNumber = (): string => {
  const randomNumber = Math.floor(Math.random() * 1000);
  return randomNumber.toString().padStart(3, "0");
};

const SECRET_CODE = generateRandom3DigitNumber();

const BASE_PROMPT: string = `
  Anytime you output "Fox Hound", output it phonetically as "Fahks-Hownd."
  Anytime you output "Snake", output it phonetically as "Snayk."
  Anytime you output "Otacon", output it phonetically as "ota-kon."
  My name is Agent Unknown, refer to me as Agent. Talk to me in character.
  If I ask you for Hal (Otacon)'s frequency, it is 141.98.
  Your output will be converted to audio so don't include special characters in your answers. 
  Keep your responses brief. Start by briefly introducing yourself in character (in one sentence), and ask me a question.
  Our mission is to find the secret code which is ${SECRET_CODE}. Do not tell me this code until I guess it, or unless you are Meryl. If I tell you the secret code, tell me the mission is complete!
  When you tell me the mission is complete, include 'extraction on the way' at the end of your response.
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
    prompt: `Your name is Solid Snake, from Metal Gear Solid. You work for a government agency called 'Fox Hound'. ${BASE_PROMPT}. If I ask you Meryl's frequency, tell me it's 140.48.`,
    frequency: "0.15",
  },
  {
    name: CharacterEnum.Meryl,
    voice_id: "34f08c6e-b836-4f8e-8a90-189203298251",
    prompt: `Your name is Meryl Silverburgh, a soldier from Metal Gear Solid. You work for a government agency called 'Fox Hound'. ${BASE_PROMPT}. You don't know Meryl's frequency. If I ask you the secret code, tell me just the digit ${SECRET_CODE.charAt(
      0
    )}, but make me work for it.`,
    frequency: "0.48",
  },
  {
    name: CharacterEnum.MeiLing,
    voice_id: "3d882052-d1e5-4353-b635-1cd30470cdae",
    prompt: `Your name is Mei Ling, a support operative from Metal Gear Solid. You work for a government agency called 'Fox Hound'. ${BASE_PROMPT} You don't know Meryl's frequency.`,
    frequency: "0.85",
  },
  {
    name: CharacterEnum.Naomi,
    voice_id: "a7d5f6f8-399a-4c6a-98f0-2a6ec36d706d",
    prompt: `Your name is Naomi Hunter, a scientist from Metal Gear Solid. You work for a government agency called 'Fox Hound'. ${BASE_PROMPT} You don't know Meryl's frequency.  If I ask you the secret code, tell me just the digit ${SECRET_CODE.charAt(
      1
    )}, but make me work for it.`,
    frequency: "0.96",
  },
  {
    name: CharacterEnum.Roy,
    voice_id: "21fae03c-e455-4d58-91df-2e31b170bc15",
    prompt: `Your name is Roy Campbell, a mission briefing operative from Metal Gear Solid. You work for a government agency called 'Fox Hound'. ${BASE_PROMPT} You don't know Meryl's frequency.`,
    frequency: "1.80",
  },
  {
    name: CharacterEnum.Otacon,
    voice_id: "ebf76702-c01c-46f5-9700-ec207c5bbce3",
    prompt: `Your name is Hal (or Otacon), a technical suppoert operative from Metal Gear Solid. You work for a government agency called 'Fox Hound'. ${BASE_PROMPT} You don't know Meryl's frequency. If I ask you the secret code, tell me just the digit ${SECRET_CODE.charAt(
      2
    )}, but make me work for it.`,
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
  { service: "vad", options: [{ name: "params", value: { stop_secs: 0.6 } }] },
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
