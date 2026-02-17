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
import { getTextFromSelectionOrClipboard, stripQuotes } from "./lib/utils";

interface Preferences {
  openaiApiKey: string;
  openrouterApiKey: string;
  defaultModel: string;
  temperature: string;
  maxTokens: string;
  customSystemPrompt: string;
  translateEsDisplayModel: string;
}

export default function TranslateEsDisplayCommand() {
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
      showToast(Toast.Style.Animated, "Translating to Spanish...");

      const response = await processText({
        text: textToProcess,
        action: "translateToSpanish",
        model: preferences.defaultModel,
        temperature: parseFloat(preferences.temperature),
        maxTokens: parseInt(preferences.maxTokens),
        openaiApiKey: preferences.openaiApiKey,
        openrouterApiKey: preferences.openrouterApiKey,
        customSystemPrompt: preferences.customSystemPrompt,
        commandName: "translateEsDisplay",
        preferences: preferences,
      });

      if (response) {
        // Ensure response is a string - handle both string and object responses
        let translationText: string;
        if (typeof response === 'string') {
          translationText = response;
        } else if (response && typeof response === 'object') {
          // Try to extract content from object
          translationText = (response as any).content || (response as any).text || JSON.stringify(response);
        } else {
          translationText = String(response);
        }
        // Strip quotes to ensure clean output for display
        translationText = stripQuotes(translationText);
        setTranslation(translationText);
        showToast(Toast.Style.Success, "Translation to Spanish completed");
      } else {
        showToast(Toast.Style.Failure, "Failed to translate text");
      }
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : String(error);
      showToast(
        Toast.Style.Failure,
        "Error translating text",
        errorMessage,
      );
      setTranslation(""); // Clear translation on error
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
            subtitle="Please wait while we translate to Spanish"
            icon={Icon.Clock}
          />
        </List.Section>
      </List>
    );
  }

  if (translation) {
    return (
      <Detail
        markdown={`# Translation (Spanish)\n\n${translation}`}
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
