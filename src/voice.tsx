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
  const [permissionStatus, setPermissionStatus] = useState<string>("unknown");
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  // Check permission status on component mount
  React.useEffect(() => {
    checkMicrophonePermission().then(setPermissionStatus);
  }, []);

  const startRecording = async () => {
    try {
      // First check if we have permission
      const permission = await navigator.permissions.query({ name: 'microphone' as PermissionName });
      
      if (permission.state === 'denied') {
        showToast(Toast.Style.Failure, "Microphone permission denied", "Please enable microphone access in System Preferences > Security & Privacy > Privacy > Microphone");
        return;
      }

      // Request microphone access with more specific constraints
      const stream = await navigator.mediaDevices.getUserMedia({ 
        audio: {
          echoCancellation: true,
          noiseSuppression: true,
          autoGainControl: true,
          sampleRate: 44100,
        } 
      });
      
      const mediaRecorder = new MediaRecorder(stream, {
        mimeType: 'audio/webm;codecs=opus'
      });
      mediaRecorderRef.current = mediaRecorder;

      const chunks: Blob[] = [];
      mediaRecorder.ondataavailable = (event) => {
        if (event.data.size > 0) {
          chunks.push(event.data);
        }
      };

      mediaRecorder.onstop = () => {
        const audioBlob = new Blob(chunks, { type: "audio/webm" });
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
      console.error("Recording error:", error);
      if (error instanceof Error) {
        if (error.name === 'NotAllowedError') {
          showToast(Toast.Style.Failure, "Microphone access denied", "Please allow microphone access when prompted, or check System Preferences > Security & Privacy > Privacy > Microphone");
        } else if (error.name === 'NotFoundError') {
          showToast(Toast.Style.Failure, "No microphone found", "Please connect a microphone and try again");
        } else {
          showToast(Toast.Style.Failure, "Recording failed", error.message);
        }
      } else {
        showToast(Toast.Style.Failure, "Failed to start recording", "Please check microphone permissions");
      }
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

  const checkMicrophonePermission = async () => {
    try {
      const permission = await navigator.permissions.query({ name: 'microphone' as PermissionName });
      return permission.state;
    } catch (error) {
      console.error("Permission check error:", error);
      return 'unknown';
    }
  };

  return (
    <List>
      <List.Section title="Voice Recording">
        {permissionStatus === "denied" && (
          <List.Item
            title="Microphone Permission Required"
            subtitle="Please enable microphone access in System Preferences > Security & Privacy > Privacy > Microphone"
            icon={Icon.ExclamationMark}
            actions={
              <ActionPanel>
                <Action 
                  title="Open System Preferences" 
                  onAction={() => {
                    // This will open System Preferences to the Privacy section
                    showToast(Toast.Style.Success, "Please navigate to System Preferences > Security & Privacy > Privacy > Microphone");
                  }} 
                  icon={Icon.Gear} 
                />
              </ActionPanel>
            }
          />
        )}
        
        <List.Item
          title={recordingState.isRecording ? "Stop Recording" : "Start Recording"}
          subtitle={
            recordingState.isRecording
              ? `Recording... ${formatDuration(recordingState.duration)}`
              : permissionStatus === "denied"
              ? "Microphone access denied - check permissions"
              : "Tap to start recording your voice"
          }
          icon={recordingState.isRecording ? Icon.Stop : Icon.Microphone}
          actions={
            <ActionPanel>
              {recordingState.isRecording ? (
                <Action title="Stop Recording" onAction={stopRecording} icon={Icon.Stop} />
              ) : (
                <Action 
                  title="Start Recording" 
                  onAction={startRecording} 
                  icon={Icon.Microphone}
                  shortcut={{ modifiers: ["cmd"], key: "r" }}
                />
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
