import React, { useState } from "react";
import {
  ActionPanel,
  Action,
  List,
  Icon,
  showToast,
  Toast,
  getPreferenceValues,
  Clipboard,
} from "@raycast/api";
import { processText } from "./lib/ai";
import { getTextFromSelectionOrClipboard } from "./lib/utils";

interface Preferences {
  openaiApiKey: string;
  openrouterApiKey: string;
  defaultModel: string;
  temperature: string;
  maxTokens: string;
  customSystemPrompt: string;
  translateDisplayModel: string;
}

export default function TranslateDisplayCommand() {
  const preferences = getPreferenceValues<Preferences>();
  const [isProcessing, setIsProcessing] = useState(false);
  const [translation, setTranslation] = useState<string>("");
  const [originalText, setOriginalText] = useState<string>("");
  const [targetLanguage, setTargetLanguage] = useState<string>("English");

  const translateText = async (action: string, language: string) => {
    try {
      // Get text from selection or clipboard
      const textToProcess = await getTextFromSelectionOrClipboard();

      if (!textToProcess) {
        return;
      }

      if (!preferences.openaiApiKey && !preferences.openrouterApiKey) {
        showToast(Toast.Style.Failure, "Please configure API keys in settings");
        return;
      }

      setIsProcessing(true);
      setOriginalText(textToProcess);
      setTargetLanguage(language);
      showToast(Toast.Style.Animated, `Translating to ${language}...`);

      const response = await processText({
        text: textToProcess,
        action: action,
        model: preferences.defaultModel,
        temperature: parseFloat(preferences.temperature),
        maxTokens: parseInt(preferences.maxTokens),
        openaiApiKey: preferences.openaiApiKey,
        openrouterApiKey: preferences.openrouterApiKey,
        customSystemPrompt: preferences.customSystemPrompt,
        commandName: "translateDisplay",
        preferences: preferences,
      });

      if (response) {
        setTranslation(response);
        showToast(Toast.Style.Success, `Translation to ${language} completed`);
      } else {
        showToast(Toast.Style.Failure, "Failed to translate text");
      }
    } catch (error) {
      showToast(
        Toast.Style.Failure,
        "Error translating text",
        error instanceof Error ? error.message : "Unknown error",
      );
    } finally {
      setIsProcessing(false);
    }
  };

  const copyToClipboard = async () => {
    if (translation) {
      await Clipboard.paste(translation);
      showToast(Toast.Style.Success, "Translation copied to clipboard");
    }
  };

  const copyOriginal = async () => {
    if (originalText) {
      await Clipboard.paste(originalText);
      showToast(Toast.Style.Success, "Original text copied to clipboard");
    }
  };

  const clearTranslation = () => {
    setTranslation("");
    setOriginalText("");
    setTargetLanguage("English");
  };

  return (
    <List>
      <List.Section title="Translation Options">
        <List.Item
          title="Translate to English"
          subtitle="Select text and click to translate to English"
          icon={Icon.Text}
          actions={
            <ActionPanel>
              <Action 
                title="Translate to English" 
                onAction={() => translateText("translateToEnglish", "English")} 
                icon={Icon.Text} 
              />
            </ActionPanel>
          }
        />

        <List.Item
          title="Translate to Turkish"
          subtitle="Select text and click to translate to Turkish"
          icon={Icon.Text}
          actions={
            <ActionPanel>
              <Action 
                title="Translate to Turkish" 
                onAction={() => translateText("translateToTurkish", "Turkish")} 
                icon={Icon.Text} 
              />
            </ActionPanel>
          }
        />

        <List.Item
          title="Translate to Persian"
          subtitle="Select text and click to translate to Persian"
          icon={Icon.Text}
          actions={
            <ActionPanel>
              <Action 
                title="Translate to Persian" 
                onAction={() => translateText("translateToPersian", "Persian")} 
                icon={Icon.Text} 
              />
            </ActionPanel>
          }
        />

        <List.Item
          title="Translate to Spanish"
          subtitle="Select text and click to translate to Spanish"
          icon={Icon.Text}
          actions={
            <ActionPanel>
              <Action 
                title="Translate to Spanish" 
                onAction={() => translateText("translateToSpanish", "Spanish")} 
                icon={Icon.Text} 
              />
            </ActionPanel>
          }
        />

        <List.Item
          title="Translate to Casual English"
          subtitle="Select text and click to translate to casual English"
          icon={Icon.Text}
          actions={
            <ActionPanel>
              <Action 
                title="Translate to Casual English" 
                onAction={() => translateText("translateToEnglishCasual", "Casual English")} 
                icon={Icon.Text} 
              />
            </ActionPanel>
          }
        />
      </List.Section>

      {isProcessing && (
        <List.Section title="Processing">
          <List.Item
            title="Translating..."
            subtitle={`Please wait while we translate to ${targetLanguage}`}
            icon={Icon.Clock}
          />
        </List.Section>
      )}

      {translation && (
        <List.Section title="Translation Result">
          <List.Item
            title="Original Text"
            subtitle={originalText.length > 100 ? originalText.substring(0, 100) + "..." : originalText}
            icon={Icon.Document}
            actions={
              <ActionPanel>
                <Action title="Copy Original" onAction={copyOriginal} icon={Icon.CopyClipboard} />
                <Action title="Clear All" onAction={clearTranslation} icon={Icon.Trash} />
              </ActionPanel>
            }
          />
          <List.Item
            title={`Translation (${targetLanguage})`}
            subtitle={translation.length > 100 ? translation.substring(0, 100) + "..." : translation}
            icon={Icon.Text}
            actions={
              <ActionPanel>
                <Action title="Copy Translation" onAction={copyToClipboard} icon={Icon.CopyClipboard} />
                <Action title="Clear All" onAction={clearTranslation} icon={Icon.Trash} />
              </ActionPanel>
            }
          />
        </List.Section>
      )}

      <List.Section title="Instructions">
        <List.Item
          title="How to Use"
          subtitle="1. Select text in any app 2. Open this command 3. Choose target language 4. View translation"
          icon={Icon.QuestionMark}
        />
        <List.Item
          title="API Requirements"
          subtitle="OpenAI or OpenRouter API key required"
          icon={Icon.Key}
        />
      </List.Section>
    </List>
  );
}
