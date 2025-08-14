import React, { useState, useRef } from "react";
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

interface Preferences {
  openaiApiKey: string;
  openrouterApiKey: string;
  defaultModel: string;
  temperature: string;
  maxTokens: string;
  customSystemPrompt: string;
  voiceModel: string;
}

interface RecordingState {
  isRecording: boolean;
  audioBlob: Blob | null;
  duration: number;
}

export default function VoiceCommand() {
  const preferences = getPreferenceValues<Preferences>();
  const [recordingState, setRecordingState] = useState<RecordingState>({
    isRecording: false,
    audioBlob: null,
    duration: 0,
  });
  const [transcription, setTranscription] = useState<string>("");
  const [isTranscribing, setIsTranscribing] = useState(false);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const mediaRecorder = new MediaRecorder(stream);
      mediaRecorderRef.current = mediaRecorder;

      const chunks: Blob[] = [];
      mediaRecorder.ondataavailable = (event) => {
        if (event.data.size > 0) {
          chunks.push(event.data);
        }
      };

      mediaRecorder.onstop = () => {
        const audioBlob = new Blob(chunks, { type: "audio/wav" });
        setRecordingState((prev) => ({
          ...prev,
          audioBlob,
          isRecording: false,
        }));
        stream.getTracks().forEach((track) => track.stop());
      };

      mediaRecorder.start();
      setRecordingState((prev) => ({ ...prev, isRecording: true, duration: 0 }));

      // Start duration timer
      intervalRef.current = setInterval(() => {
        setRecordingState((prev) => ({ ...prev, duration: prev.duration + 1 }));
      }, 1000);

      showToast(Toast.Style.Success, "Recording started");
    } catch (error) {
      showToast(Toast.Style.Failure, "Failed to start recording", "Please check microphone permissions");
    }
  };

  const stopRecording = () => {
    if (mediaRecorderRef.current && recordingState.isRecording) {
      mediaRecorderRef.current.stop();
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
      showToast(Toast.Style.Success, "Recording stopped");
    }
  };

  const transcribeAudio = async () => {
    if (!recordingState.audioBlob) {
      showToast(Toast.Style.Failure, "No audio to transcribe");
      return;
    }

    if (!preferences.openaiApiKey && !preferences.openrouterApiKey) {
      showToast(Toast.Style.Failure, "Please configure API keys in settings");
      return;
    }

    setIsTranscribing(true);
    showToast(Toast.Style.Animated, "Transcribing audio...");

    try {
      // Convert audio blob to base64
      const arrayBuffer = await recordingState.audioBlob.arrayBuffer();
      const base64Audio = btoa(String.fromCharCode(...new Uint8Array(arrayBuffer)));

      // Get the model to use
      let model = preferences.defaultModel;
      if (preferences.voiceModel && preferences.voiceModel.trim()) {
        model = preferences.voiceModel;
      }

      // For voice transcription, we'll use a special action
      const response = await processText({
        text: base64Audio,
        action: "transcribeAudio",
        model,
        temperature: parseFloat(preferences.temperature),
        maxTokens: parseInt(preferences.maxTokens),
        openaiApiKey: preferences.openaiApiKey,
        openrouterApiKey: preferences.openrouterApiKey,
        customSystemPrompt: preferences.customSystemPrompt,
        commandName: "voice",
        preferences,
        audioData: recordingState.audioBlob,
      });

      if (response) {
        setTranscription(response);
        showToast(Toast.Style.Success, "Audio transcribed successfully");
      } else {
        showToast(Toast.Style.Failure, "Failed to transcribe audio");
      }
    } catch (error) {
      showToast(
        Toast.Style.Failure,
        "Error transcribing audio",
        error instanceof Error ? error.message : "Unknown error"
      );
    } finally {
      setIsTranscribing(false);
    }
  };

  const copyToClipboard = async () => {
    if (transcription) {
      await Clipboard.paste(transcription);
      showToast(Toast.Style.Success, "Transcription copied to clipboard");
    }
  };

  const clearRecording = () => {
    setRecordingState({
      isRecording: false,
      audioBlob: null,
      duration: 0,
    });
    setTranscription("");
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  };

  const formatDuration = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, "0")}`;
  };

  return (
    <List>
      <List.Section title="Voice Recording">
        <List.Item
          title={recordingState.isRecording ? "Stop Recording" : "Start Recording"}
          subtitle={
            recordingState.isRecording
              ? `Recording... ${formatDuration(recordingState.duration)}`
              : "Tap to start recording your voice"
          }
          icon={recordingState.isRecording ? Icon.Stop : Icon.Microphone}
          actions={
            <ActionPanel>
              {recordingState.isRecording ? (
                <Action title="Stop Recording" onAction={stopRecording} icon={Icon.Stop} />
              ) : (
                <Action title="Start Recording" onAction={startRecording} icon={Icon.Microphone} />
              )}
            </ActionPanel>
          }
        />

        {recordingState.audioBlob && !recordingState.isRecording && (
          <List.Item
            title="Transcribe Audio"
            subtitle="Convert your recording to text"
            icon={Icon.Text}
            actions={
              <ActionPanel>
                <Action
                  title="Transcribe Audio"
                  onAction={transcribeAudio}
                  icon={Icon.Text}
                  shortcut={{ modifiers: ["cmd"], key: "t" }}
                />
                <Action title="Clear Recording" onAction={clearRecording} icon={Icon.Trash} />
              </ActionPanel>
            }
          />
        )}
      </List.Section>

      {transcription && (
        <List.Section title="Transcription">
          <List.Item
            title="Copy to Clipboard"
            subtitle="Copy transcription to clipboard"
            icon={Icon.CopyClipboard}
            actions={
              <ActionPanel>
                <Action title="Copy to Clipboard" onAction={copyToClipboard} icon={Icon.CopyClipboard} />
                <Action title="Clear All" onAction={clearRecording} icon={Icon.Trash} />
              </ActionPanel>
            }
          />
          <List.Item
            title="Transcription Result"
            subtitle={transcription}
            icon={Icon.Document}
            actions={
              <ActionPanel>
                <Action title="Copy to Clipboard" onAction={copyToClipboard} icon={Icon.CopyClipboard} />
                <Action title="Clear All" onAction={clearRecording} icon={Icon.Trash} />
              </ActionPanel>
            }
          />
        </List.Section>
      )}

      {isTranscribing && (
        <List.Item
          title="Transcribing..."
          subtitle="Please wait while we process your audio"
          icon={Icon.Clock}
        />
      )}
    </List>
  );
}
