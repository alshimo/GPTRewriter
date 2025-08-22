import React, { useState, useRef, useEffect } from "react";
import {
  ActionPanel,
  Action,
  List,
  Icon,
  showToast,
  Toast,
  getPreferenceValues,
  Clipboard,
  Form,
} from "@raycast/api";
import { useForm } from "@raycast/utils";
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

export default function VoiceCommand() {
  const preferences = getPreferenceValues<Preferences>();
  const [isProcessing, setIsProcessing] = useState(false);
  const [transcription, setTranscription] = useState<string>("");
  const [showForm, setShowForm] = useState(false);
  const [isRecording, setIsRecording] = useState(false);
  const [recordingTime, setRecordingTime] = useState(0);
  const [audioBlob, setAudioBlob] = useState<Blob | null>(null);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const streamRef = useRef<MediaStream | null>(null);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  const startRecording = async () => {
    try {
      // Check if we're in a browser-like environment
      if (typeof navigator === 'undefined' || !navigator.mediaDevices) {
        showToast(Toast.Style.Failure, "Microphone access not available", "Please use the file-based transcription method");
        setShowForm(true);
        return;
      }

      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      streamRef.current = stream;
      
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
        const blob = new Blob(chunks, { type: 'audio/webm' });
        setAudioBlob(blob);
        setIsRecording(false);
        setRecordingTime(0);
        if (intervalRef.current) {
          clearInterval(intervalRef.current);
          intervalRef.current = null;
        }
        stream.getTracks().forEach(track => track.stop());
        showToast(Toast.Style.Success, "Recording completed");
      };

      mediaRecorder.start();
      setIsRecording(true);
      setRecordingTime(0);
      
      // Start timer
      intervalRef.current = setInterval(() => {
        setRecordingTime(prev => prev + 1);
      }, 1000);

      showToast(Toast.Style.Success, "Recording started");
    } catch (error) {
      console.error("Recording error:", error);
      if (error instanceof Error && error.name === 'NotAllowedError') {
        showToast(Toast.Style.Failure, "Microphone permission denied", "Please enable microphone access in System Preferences > Security & Privacy > Microphone");
      } else {
        showToast(Toast.Style.Failure, "Failed to start recording", "Please use the file-based transcription method");
        setShowForm(true);
      }
    }
  };

  const stopRecording = () => {
    if (mediaRecorderRef.current && isRecording) {
      mediaRecorderRef.current.stop();
    }
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
      if (streamRef.current) {
        streamRef.current.getTracks().forEach(track => track.stop());
      }
    };
  }, []);

  const { handleSubmit, itemProps } = useForm<{ audioFilePath: string }>({
    onSubmit: async (values) => {
      if (!values.audioFilePath.trim()) {
        showToast(Toast.Style.Failure, "Please enter an audio file path");
        return;
      }

      if (!preferences.openaiApiKey) {
        showToast(Toast.Style.Failure, "OpenAI API key required for transcription");
        return;
      }

      setIsProcessing(true);
      showToast(Toast.Style.Animated, "Transcribing audio file...");

      try {
        // Read the audio file
        const { readFile } = await import("fs/promises");
        const audioBuffer = await readFile(values.audioFilePath);
        
        // Convert Buffer to Uint8Array for Blob
        const uint8Array = new Uint8Array(audioBuffer);
        
        // Convert to Blob for the API
        const fileBlob = new Blob([uint8Array], { type: "audio/wav" });

        // Get the model to use
        let model = preferences.defaultModel;
        if (preferences.voiceModel && preferences.voiceModel.trim()) {
          model = preferences.voiceModel;
        }

        // Use the transcribeAudio action
        const response = await processText({
          text: "", // Not used for audio transcription
          action: "transcribeAudio",
          model,
          temperature: parseFloat(preferences.temperature),
          maxTokens: parseInt(preferences.maxTokens),
          openaiApiKey: preferences.openaiApiKey,
          openrouterApiKey: preferences.openrouterApiKey,
          customSystemPrompt: preferences.customSystemPrompt,
          commandName: "voice",
          preferences,
          audioData: fileBlob,
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
          "Error transcribing audio file",
          error instanceof Error ? error.message : "Unknown error",
        );
      } finally {
        setIsProcessing(false);
        setShowForm(false);
      }
    },
  });

  const transcribeRecording = async () => {
    if (!audioBlob) {
      showToast(Toast.Style.Failure, "No recording available");
      return;
    }

    if (!preferences.openaiApiKey) {
      showToast(Toast.Style.Failure, "OpenAI API key required for transcription");
      return;
    }

    setIsProcessing(true);
    showToast(Toast.Style.Animated, "Transcribing audio...");

    try {
      // Get the model to use
      let model = preferences.defaultModel;
      if (preferences.voiceModel && preferences.voiceModel.trim()) {
        model = preferences.voiceModel;
      }

      // Use the transcribeAudio action
      const response = await processText({
        text: "", // Not used for audio transcription
        action: "transcribeAudio",
        model,
        temperature: parseFloat(preferences.temperature),
        maxTokens: parseInt(preferences.maxTokens),
        openaiApiKey: preferences.openaiApiKey,
        openrouterApiKey: preferences.openrouterApiKey,
        customSystemPrompt: preferences.customSystemPrompt,
        commandName: "voice",
        preferences,
        audioData: audioBlob,
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
        error instanceof Error ? error.message : "Unknown error",
      );
    } finally {
      setIsProcessing(false);
    }
  };

  const copyToClipboard = async () => {
    if (transcription) {
      await Clipboard.paste(transcription);
      showToast(Toast.Style.Success, "Transcription copied to clipboard");
    }
  };

  const clearTranscription = () => {
    setTranscription("");
  };

    return (
    <>
      <List>
        <List.Section title="Voice Recording">
          <List.Item
            title={isRecording ? "Stop Recording" : "Start Recording"}
            subtitle={
              isRecording 
                ? `Recording... ${formatTime(recordingTime)}`
                : "Tap to start recording your voice"
            }
            icon={isRecording ? Icon.Stop : Icon.Microphone}
            actions={
              <ActionPanel>
                {isRecording ? (
                  <Action title="Stop Recording" onAction={stopRecording} icon={Icon.Stop} />
                ) : (
                  <Action title="Start Recording" onAction={startRecording} icon={Icon.Microphone} />
                )}
              </ActionPanel>
            }
          />

          {audioBlob && !isRecording && (
            <List.Item
              title="Transcribe Recording"
              subtitle="Convert your recording to text"
              icon={Icon.Text}
              actions={
                <ActionPanel>
                  <Action
                    title="Transcribe Recording"
                    onAction={transcribeRecording}
                    icon={Icon.Text}
                  />
                  <Action 
                    title="Clear Recording" 
                    onAction={() => {
                      setAudioBlob(null);
                      setTranscription("");
                    }} 
                    icon={Icon.Trash} 
                  />
                </ActionPanel>
              }
            />
          )}

          <List.Item
            title="Transcribe Audio File"
            subtitle="Use existing audio file for transcription"
            icon={Icon.Document}
            actions={
              <ActionPanel>
                <Action
                  title="Enter File Path"
                  onAction={() => setShowForm(true)}
                  icon={Icon.Document}
                />
              </ActionPanel>
            }
          />
        </List.Section>

        <List.Section title="Instructions">
          <List.Item
            title="How to Use Voice-to-Text"
            subtitle="1. Click 'Start Recording' 2. Speak into your microphone 3. Click 'Stop Recording' 4. Transcribe"
            icon={Icon.QuestionMark}
          />

          <List.Item
            title="Microphone Required"
            subtitle="Make sure your microphone is connected and has permissions"
            icon={Icon.Microphone}
          />

          <List.Item
            title="API Requirements"
            subtitle="OpenAI API key required for transcription"
            icon={Icon.Key}
          />
        </List.Section>

        {isProcessing && (
          <List.Item
            title="Transcribing..."
            subtitle="Please wait while we process your audio"
            icon={Icon.Clock}
          />
        )}
      </List>

      {showForm && (
        <Form
          actions={
            <ActionPanel>
              <Action.SubmitForm title="Transcribe Audio File" onSubmit={handleSubmit} />
              <Action title="Cancel" onAction={() => setShowForm(false)} />
            </ActionPanel>
          }
        >
          <Form.TextField
            {...itemProps.audioFilePath}
            title="Audio File Path"
            placeholder="/path/to/your/audio/file.wav"
            info="Enter the full path to your audio file (e.g., /Users/username/Desktop/recording.wav)"
          />
        </Form>
      )}

    {transcription && (
      <List>
        <List.Section title="Transcription Result">
          <List.Item
            title="Copy to Clipboard"
            subtitle="Copy transcription to clipboard"
            icon={Icon.CopyClipboard}
            actions={
              <ActionPanel>
                <Action title="Copy to Clipboard" onAction={copyToClipboard} icon={Icon.CopyClipboard} />
                <Action title="Clear" onAction={clearTranscription} icon={Icon.Trash} />
              </ActionPanel>
            }
          />
          <List.Item
            title="Transcription"
            subtitle={transcription}
            icon={Icon.Document}
            actions={
              <ActionPanel>
                <Action title="Copy to Clipboard" onAction={copyToClipboard} icon={Icon.CopyClipboard} />
                <Action title="Clear" onAction={clearTranscription} icon={Icon.Trash} />
              </ActionPanel>
            }
          />
        </List.Section>
      </List>
    )}
  </>
  );
}
