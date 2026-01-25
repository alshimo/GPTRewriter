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
  Detail,
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
  translateEnCasualDisplayModel: string;
}

export default function TranslateEnCasualDisplayCommand() {
  const preferences = getPreferenceValues<Preferences>();
  const [isProcessing, setIsProcessing] = useState(false);
  const [translation, setTranslation] = useState<string>("");
  const [originalText, setOriginalText] = useState<string>("");

  const translateText = async () => {
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
      showToast(Toast.Style.Animated, "Translating to Casual English...");

      const response = await processText({
        text: textToProcess,
        action: "translateToEnglishCasual",
        model: preferences.defaultModel,
        temperature: parseFloat(preferences.temperature),
        maxTokens: parseInt(preferences.maxTokens),
        openaiApiKey: preferences.openaiApiKey,
        openrouterApiKey: preferences.openrouterApiKey,
        customSystemPrompt: preferences.customSystemPrompt,
        commandName: "translateEnCasualDisplay",
        preferences: preferences,
      });

      if (response) {
        setTranslation(response);
        showToast(Toast.Style.Success, "Translation to Casual English completed");
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
  };

  // Auto-translate immediately when component renders
  React.useEffect(() => {
    // Clear previous state first
    setTranslation("");
    setOriginalText("");
    setIsProcessing(false);
    // Then translate fresh text
    translateText();
  }, []);

  if (isProcessing) {
    return (
      <List>
        <List.Section title="Processing">
          <List.Item
            title="Translating..."
            subtitle="Please wait while we translate to Casual English"
            icon={Icon.Clock}
          />
        </List.Section>
      </List>
    );
  }

  if (translation) {
    return (
      <Detail
        markdown={`# Translation (Casual English)\n\n${translation}`}
        actions={
          <ActionPanel>
            <Action title="Copy Translation" onAction={copyToClipboard} icon={Icon.CopyClipboard} />
          </ActionPanel>
        }
      />
    );
  }

  return (
    <List>
      <List.Section title="Error">
        <List.Item
          title="No text selected"
          subtitle="Please select text and try again"
          icon={Icon.ExclamationMark}
        />
      </List.Section>
    </List>
  );
}
