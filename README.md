[![Try](https://img.shields.io/badge/try_it-here-blue)](https://mgsx-daily-bots.vercel.app/)
[![Deploy](https://img.shields.io/badge/Deploy_to_Vercel-black?style=flat&logo=Vercel&logoColor=white)](https://vercel.com/new/clone?repository-url=https%3A%2F%2Fgithub.com%2Fjptraylors%2Fmgsx-daily-botso&env=DAILY_BOTS_URL,DAILY_BOTS_API_KEY,&project-name=mgsx-codec&repository-name=mgsx-daily-bots)



# Metal Gear Solid Codec - Daily Bots Demo

<img src="src/app/opengraph-image.png" width="420px">

AI Codec Call powered by [Daily Bots](https://bots.daily.co).

## Run it locally

### Grab a Daily Bots API key

Sign-up here: [https://bots.daily.co](https://bots.daily.co)

### Configure your local environment

```shell
cp env.example .env.local
```

`DAILY_BOTS_URL` URL of the Daily Bots `start` endpoint (https://api.daily.co/v1/bots/start)

`DAILY_BOTS_API_KEY` your Daily API key obtained by registering at https://bots.daily.co.

### Install dependencies

```shell
yarn 
```

### Run the project

```shell
yarn run dev
```

## How does this work?

Daily Bots is built on two open-source technologies:

- [Pipecat](https://www.pipecat.ai) - Python library for building real-time agent
- [RTVI](https://github.com/rtvi-ai) - Open-standard for Real-Time Voice [and Video] Inference

This project makes use of [`realtime-ai`](https://www.npmjs.com/package/realtime-ai), [`realtime-ai-react`](https://www.npmjs.com/package/realtime-ai-react) and [`realtime-ai-daily`](https://www.npmjs.com/package/realtime-ai-daily) to interact with the Daily Bot.

Learn more about the RTVI web client libraries [on the docs](https://docs.rtvi.ai).

### Configuration

All Voice Client configuration can be found in the [rtvi.config.ts](/rtvi.config.ts) file. You can edit any prompts, services of config settings in this file.

### API routes

This project exposes three server-side routes:

- [api/route.ts](app/api/route.ts)
- optional: [api/dialin/route.ts](app/api/dialin/route.ts)
- optional: [api/dialout/route.ts](app/api/dialout/route.ts)

The routes project a secure way to pass any required secrets or configuration directly to the Daily Bots API. Your `NEXT_PUBLIC_BASE_URL` must point to your `/api` route and passed to the `VoiceClient`. 

The routes are passed a `config` array and `services` map, which can be passed to the Daily Bots REST API, or modified securely. 

Daily Bots `https://api.daily.co/v1/bots/start` has some required properties, which you can read more about [here](https://docs.dailybots.ai/api-reference/endpoint/startBot). You must set:

- `bot_profile`
- `max_duration`
- `config`
- `services`
- Optional, if using OpenAI: `api_keys`
