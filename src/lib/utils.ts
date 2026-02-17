import { getSelectedText, showToast, Toast } from "@raycast/api";

/**
 * Strips leading and trailing quotes (single, double, or smart quotes) from text
 * This ensures AI responses don't have unwanted quote wrapping
 */
export function stripQuotes(text: string): string {
  if (!text) return text;
  
  // Remove leading and trailing whitespace first
  let cleaned = text.trim();
  
  // Remove leading and trailing quotes (single, double, smart quotes)
  // Match: ", ', ", ', ", ', etc.
  cleaned = cleaned.replace(/^["'""''«»„‚]+|["'""''«»„‚]+$/g, '');
  
  // Also handle cases where quotes might be on separate lines
  cleaned = cleaned.replace(/^["'""''«»„‚]\s*|\s*["'""''«»„‚]$/g, '');
  
  return cleaned.trim();
}

export async function getTextFromSelectionOrClipboard(): Promise<
  string | null
> {
  // Get selected text first
  let textToProcess: string;

  try {
    textToProcess = await getSelectedText();
  } catch (error) {
    // If getSelectedText fails (no text selected), try clipboard
    console.log("No text selected, trying clipboard...");
    textToProcess = "";
  }

  // If no text is selected, try to get from clipboard
  if (!textToProcess || !textToProcess.trim()) {
    try {
      // Use AppleScript to get clipboard content
      const { execSync } = await import("child_process");
      const clipboardText = execSync("pbpaste", { encoding: "utf8" }).trim();

      if (clipboardText) {
        textToProcess = clipboardText;
        showToast(
          Toast.Style.Success,
          "No text selected - using clipboard content",
        );
        return textToProcess;
      } else {
        showToast(
          Toast.Style.Failure,
          "No text selected and clipboard is empty",
        );
        return null;
      }
    } catch (clipboardError) {
      showToast(
        Toast.Style.Failure,
        "No text selected and couldn't access clipboard",
      );
      return null;
    }
  }

  return textToProcess;
}
