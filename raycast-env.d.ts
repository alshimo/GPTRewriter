/// <reference types="@raycast/api">

/* 🚧 🚧 🚧
 * This file is auto-generated from the extension's manifest.
 * Do not modify manually. Instead, update the `package.json` file.
 * 🚧 🚧 🚧 */

/* eslint-disable @typescript-eslint/ban-types */

type ExtensionPreferences = {
  /** OpenAI API Key - Your OpenAI API key for GPT models */
  "openaiApiKey"?: string,
  /** OpenRouter API Key - Your OpenRouter API key for alternative models */
  "openrouterApiKey"?: string,
  /** Default Model - Default AI model to use */
  "defaultModel": "gpt-5" | "gpt-5-mini" | "gpt-4o-mini" | "gpt-4o" | "gpt-3.5-turbo" | "meta-llama/llama-3.3-70b-instruct:free" | "featherless/qwerky-72b:free" | "deepseek/deepseek-chat-v3-0324:free" | "z-ai/glm-4.5-air:free" | "x-ai/grok-4" | "x-ai/grok-3-mini" | "anthropic/claude-sonnet-4" | "google/gemini-2.5-flash",
  /** Temperature - AI response randomness (0.0 to 1.0) */
  "temperature": string,
  /** Max Tokens - Maximum response length */
  "maxTokens": string,
  /** Custom System Prompt - Override the default system prompt for all operations */
  "customSystemPrompt"?: string,
  /** Rewrite Command Model - Model for Rewrite command (uses default if empty) */
  "rewriteModel"?: "" | "gpt-5" | "gpt-5-mini" | "gpt-4o-mini" | "gpt-4o" | "gpt-3.5-turbo" | "meta-llama/llama-3.3-70b-instruct:free" | "featherless/qwerky-72b:free" | "deepseek/deepseek-chat-v3-0324:free" | "z-ai/glm-4.5-air:free" | "x-ai/grok-4" | "x-ai/grok-3-mini" | "anthropic/claude-sonnet-4" | "google/gemini-2.5-flash",
  /** Workplace Command Model - Model for Workplace command (uses default if empty) */
  "workplaceModel"?: "" | "gpt-5" | "gpt-5-mini" | "gpt-4o-mini" | "gpt-4o" | "gpt-3.5-turbo" | "meta-llama/llama-3.3-70b-instruct:free" | "featherless/qwerky-72b:free" | "deepseek/deepseek-chat-v3-0324:free" | "z-ai/glm-4.5-air:free" | "x-ai/grok-4" | "x-ai/grok-3-mini" | "anthropic/claude-sonnet-4" | "google/gemini-2.5-flash",
  /** Summarize Command Model - Model for Summarize command (uses default if empty) */
  "summarizeModel"?: "" | "gpt-5" | "gpt-5-mini" | "gpt-4o-mini" | "gpt-4o" | "gpt-3.5-turbo" | "meta-llama/llama-3.3-70b-instruct:free" | "featherless/qwerky-72b:free" | "deepseek/deepseek-chat-v3-0324:free" | "z-ai/glm-4.5-air:free" | "x-ai/grok-4" | "x-ai/grok-3-mini" | "anthropic/claude-sonnet-4" | "google/gemini-2.5-flash",
  /** Bullets Command Model - Model for Bullets command (uses default if empty) */
  "bulletsModel"?: "" | "gpt-5" | "gpt-5-mini" | "gpt-4o-mini" | "gpt-4o" | "gpt-3.5-turbo" | "meta-llama/llama-3.3-70b-instruct:free" | "featherless/qwerky-72b:free" | "deepseek/deepseek-chat-v3-0324:free" | "z-ai/glm-4.5-air:free" | "x-ai/grok-4" | "x-ai/grok-3-mini" | "anthropic/claude-sonnet-4" | "google/gemini-2.5-flash",
  /** Shorten Command Model - Model for Shorten command (uses default if empty) */
  "shortenModel"?: "" | "gpt-5" | "gpt-5-mini" | "gpt-4o-mini" | "gpt-4o" | "gpt-3.5-turbo" | "meta-llama/llama-3.3-70b-instruct:free" | "featherless/qwerky-72b:free" | "deepseek/deepseek-chat-v3-0324:free" | "z-ai/glm-4.5-air:free" | "x-ai/grok-4" | "x-ai/grok-3-mini" | "anthropic/claude-sonnet-4" | "google/gemini-2.5-flash",
  /** Humor Command Model - Model for Humor command (uses default if empty) */
  "humorModel"?: "" | "gpt-5" | "gpt-5-mini" | "gpt-4o-mini" | "gpt-4o" | "gpt-3.5-turbo" | "meta-llama/llama-3.3-70b-instruct:free" | "featherless/qwerky-72b:free" | "deepseek/deepseek-chat-v3-0324:free" | "z-ai/glm-4.5-air:free" | "x-ai/grok-4" | "x-ai/grok-3-mini" | "anthropic/claude-sonnet-4" | "google/gemini-2.5-flash",
  /** Questions Command Model - Model for Questions command (uses default if empty) */
  "questionsModel"?: "" | "gpt-5" | "gpt-5-mini" | "gpt-4o-mini" | "gpt-4o" | "gpt-3.5-turbo" | "meta-llama/llama-3.3-70b-instruct:free" | "featherless/qwerky-72b:free" | "deepseek/deepseek-chat-v3-0324:free" | "z-ai/glm-4.5-air:free" | "x-ai/grok-4" | "x-ai/grok-3-mini" | "anthropic/claude-sonnet-4" | "google/gemini-2.5-flash",
  /** Improve Command Model - Model for Improve command (uses default if empty) */
  "improveModel"?: "" | "gpt-5" | "gpt-5-mini" | "gpt-4o-mini" | "gpt-4o" | "gpt-3.5-turbo" | "meta-llama/llama-3.3-70b-instruct:free" | "featherless/qwerky-72b:free" | "deepseek/deepseek-chat-v3-0324:free" | "z-ai/glm-4.5-air:free" | "x-ai/grok-4" | "x-ai/grok-3-mini" | "anthropic/claude-sonnet-4" | "google/gemini-2.5-flash",
  /** Expand Command Model - Model for Expand command (uses default if empty) */
  "expandModel"?: "" | "gpt-5" | "gpt-5-mini" | "gpt-4o-mini" | "gpt-4o" | "gpt-3.5-turbo" | "meta-llama/llama-3.3-70b-instruct:free" | "featherless/qwerky-72b:free" | "deepseek/deepseek-chat-v3-0324:free" | "z-ai/glm-4.5-air:free" | "x-ai/grok-4" | "x-ai/grok-3-mini" | "anthropic/claude-sonnet-4" | "google/gemini-2.5-flash",
  /** Title Command Model - Model for Title command (uses default if empty) */
  "titleModel"?: "" | "gpt-5" | "gpt-5-mini" | "gpt-4o-mini" | "gpt-4o" | "gpt-3.5-turbo" | "meta-llama/llama-3.3-70b-instruct:free" | "featherless/qwerky-72b:free" | "deepseek/deepseek-chat-v3-0324:free" | "z-ai/glm-4.5-air:free" | "x-ai/grok-4" | "x-ai/grok-3-mini" | "anthropic/claude-sonnet-4" | "google/gemini-2.5-flash",
  /** Key Points Command Model - Model for Key Points command (uses default if empty) */
  "keypointsModel"?: "" | "gpt-5" | "gpt-5-mini" | "gpt-4o-mini" | "gpt-4o" | "gpt-3.5-turbo" | "meta-llama/llama-3.3-70b-instruct:free" | "featherless/qwerky-72b:free" | "deepseek/deepseek-chat-v3-0324:free" | "z-ai/glm-4.5-air:free" | "x-ai/grok-4" | "x-ai/grok-3-mini" | "anthropic/claude-sonnet-4" | "google/gemini-2.5-flash",
  /** Positive Command Model - Model for Positive command (uses default if empty) */
  "positiveModel"?: "" | "gpt-5" | "gpt-5-mini" | "gpt-4o-mini" | "gpt-4o" | "gpt-3.5-turbo" | "meta-llama/llama-3.3-70b-instruct:free" | "featherless/qwerky-72b:free" | "deepseek/deepseek-chat-v3-0324:free" | "z-ai/glm-4.5-air:free" | "x-ai/grok-4" | "x-ai/grok-3-mini" | "anthropic/claude-sonnet-4" | "google/gemini-2.5-flash",
  /** Negative Command Model - Model for Negative command (uses default if empty) */
  "negativeModel"?: "" | "gpt-5" | "gpt-5-mini" | "gpt-4o-mini" | "gpt-4o" | "gpt-3.5-turbo" | "meta-llama/llama-3.3-70b-instruct:free" | "featherless/qwerky-72b:free" | "deepseek/deepseek-chat-v3-0324:free" | "z-ai/glm-4.5-air:free" | "x-ai/grok-4" | "x-ai/grok-3-mini" | "anthropic/claude-sonnet-4" | "google/gemini-2.5-flash",
  /** Translate to English Model - Model for Translate to English command (uses default if empty) */
  "translateEnModel"?: "" | "gpt-5" | "gpt-5-mini" | "gpt-4o-mini" | "gpt-4o" | "gpt-3.5-turbo" | "meta-llama/llama-3.3-70b-instruct:free" | "featherless/qwerky-72b:free" | "deepseek/deepseek-chat-v3-0324:free" | "z-ai/glm-4.5-air:free" | "x-ai/grok-4" | "x-ai/grok-3-mini" | "anthropic/claude-sonnet-4" | "google/gemini-2.5-flash",
  /** Translate to Turkish Model - Model for Translate to Turkish command (uses default if empty) */
  "translateTrModel"?: "" | "gpt-5" | "gpt-5-mini" | "gpt-4o-mini" | "gpt-4o" | "gpt-3.5-turbo" | "meta-llama/llama-3.3-70b-instruct:free" | "featherless/qwerky-72b:free" | "deepseek/deepseek-chat-v3-0324:free" | "z-ai/glm-4.5-air:free" | "x-ai/grok-4" | "x-ai/grok-3-mini" | "anthropic/claude-sonnet-4" | "google/gemini-2.5-flash",
  /** Translate to Persian Model - Model for Translate to Persian command (uses default if empty) */
  "translateFaModel"?: "" | "gpt-5" | "gpt-5-mini" | "gpt-4o-mini" | "gpt-4o" | "gpt-3.5-turbo" | "meta-llama/llama-3.3-70b-instruct:free" | "featherless/qwerky-72b:free" | "deepseek/deepseek-chat-v3-0324:free" | "z-ai/glm-4.5-air:free" | "x-ai/grok-4" | "x-ai/grok-3-mini" | "anthropic/claude-sonnet-4" | "google/gemini-2.5-flash",
  /** Translate to Spanish Model - Model for Translate to Spanish command (uses default if empty) */
  "translateEsModel"?: "" | "gpt-5" | "gpt-5-mini" | "gpt-4o-mini" | "gpt-4o" | "gpt-3.5-turbo" | "meta-llama/llama-3.3-70b-instruct:free" | "featherless/qwerky-72b:free" | "deepseek/deepseek-chat-v3-0324:free" | "z-ai/glm-4.5-air:free" | "x-ai/grok-4" | "x-ai/grok-3-mini" | "anthropic/claude-sonnet-4" | "google/gemini-2.5-flash",
  /** Translate to Casual English Model - Model for Translate to Casual English command (uses default if empty) */
  "translateEnCasualModel"?: "" | "gpt-5" | "gpt-5-mini" | "gpt-4o-mini" | "gpt-4o" | "gpt-3.5-turbo" | "meta-llama/llama-3.3-70b-instruct:free" | "featherless/qwerky-72b:free" | "deepseek/deepseek-chat-v3-0324:free" | "z-ai/glm-4.5-air:free" | "x-ai/grok-4" | "x-ai/grok-3-mini" | "anthropic/claude-sonnet-4" | "google/gemini-2.5-flash",
  /** Voice to Text Model - Model for Voice to Text command (uses default if empty) */
  "voiceModel"?: "" | "gpt-5" | "gpt-5-mini" | "gpt-4o-mini" | "gpt-4o" | "gpt-3.5-turbo" | "meta-llama/llama-3.3-70b-instruct:free" | "featherless/qwerky-72b:free" | "deepseek/deepseek-chat-v3-0324:free" | "z-ai/glm-4.5-air:free" | "x-ai/grok-4" | "x-ai/grok-3-mini" | "anthropic/claude-sonnet-4" | "google/gemini-2.5-flash"
}

/** Preferences accessible in all the extension's commands */
declare type Preferences = ExtensionPreferences

declare namespace Preferences {
  /** Preferences accessible in the `rewrite` command */
  export type Rewrite = ExtensionPreferences & {}
  /** Preferences accessible in the `workplace` command */
  export type Workplace = ExtensionPreferences & {}
  /** Preferences accessible in the `translate-en` command */
  export type TranslateEn = ExtensionPreferences & {}
  /** Preferences accessible in the `translate-tr` command */
  export type TranslateTr = ExtensionPreferences & {}
  /** Preferences accessible in the `translate-fa` command */
  export type TranslateFa = ExtensionPreferences & {}
  /** Preferences accessible in the `translate-es` command */
  export type TranslateEs = ExtensionPreferences & {}
  /** Preferences accessible in the `translate-en-casual` command */
  export type TranslateEnCasual = ExtensionPreferences & {}
  /** Preferences accessible in the `summarize` command */
  export type Summarize = ExtensionPreferences & {}
  /** Preferences accessible in the `bullets` command */
  export type Bullets = ExtensionPreferences & {}
  /** Preferences accessible in the `shorten` command */
  export type Shorten = ExtensionPreferences & {}
  /** Preferences accessible in the `humor` command */
  export type Humor = ExtensionPreferences & {}
  /** Preferences accessible in the `questions` command */
  export type Questions = ExtensionPreferences & {}
  /** Preferences accessible in the `improve` command */
  export type Improve = ExtensionPreferences & {}
  /** Preferences accessible in the `expand` command */
  export type Expand = ExtensionPreferences & {}
  /** Preferences accessible in the `title` command */
  export type Title = ExtensionPreferences & {}
  /** Preferences accessible in the `keypoints` command */
  export type Keypoints = ExtensionPreferences & {}
  /** Preferences accessible in the `positive` command */
  export type Positive = ExtensionPreferences & {}
  /** Preferences accessible in the `negative` command */
  export type Negative = ExtensionPreferences & {}
  /** Preferences accessible in the `custom` command */
  export type Custom = ExtensionPreferences & {}
  /** Preferences accessible in the `settings` command */
  export type Settings = ExtensionPreferences & {}
  /** Preferences accessible in the `voice` command */
  export type Voice = ExtensionPreferences & {}
}

declare namespace Arguments {
  /** Arguments passed to the `rewrite` command */
  export type Rewrite = {}
  /** Arguments passed to the `workplace` command */
  export type Workplace = {}
  /** Arguments passed to the `translate-en` command */
  export type TranslateEn = {}
  /** Arguments passed to the `translate-tr` command */
  export type TranslateTr = {}
  /** Arguments passed to the `translate-fa` command */
  export type TranslateFa = {}
  /** Arguments passed to the `translate-es` command */
  export type TranslateEs = {}
  /** Arguments passed to the `translate-en-casual` command */
  export type TranslateEnCasual = {}
  /** Arguments passed to the `summarize` command */
  export type Summarize = {}
  /** Arguments passed to the `bullets` command */
  export type Bullets = {}
  /** Arguments passed to the `shorten` command */
  export type Shorten = {}
  /** Arguments passed to the `humor` command */
  export type Humor = {}
  /** Arguments passed to the `questions` command */
  export type Questions = {}
  /** Arguments passed to the `improve` command */
  export type Improve = {}
  /** Arguments passed to the `expand` command */
  export type Expand = {}
  /** Arguments passed to the `title` command */
  export type Title = {}
  /** Arguments passed to the `keypoints` command */
  export type Keypoints = {}
  /** Arguments passed to the `positive` command */
  export type Positive = {}
  /** Arguments passed to the `negative` command */
  export type Negative = {}
  /** Arguments passed to the `custom` command */
  export type Custom = {}
  /** Arguments passed to the `settings` command */
  export type Settings = {}
  /** Arguments passed to the `voice` command */
  export type Voice = {}
}

