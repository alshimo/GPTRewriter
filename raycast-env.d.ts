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
  "defaultModel": "gpt-4o-mini" | "gpt-4o" | "gpt-3.5-turbo" | "anthropic/claude-sonnet-4" | "google/gemini-2.5-flash",
  /** Temperature - AI response randomness (0.0 to 1.0) */
  "temperature": string,
  /** Max Tokens - Maximum response length */
  "maxTokens": string
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
}

