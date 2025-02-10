import React, { useState, useRef, useEffect } from 'react';
import './recorder.css';

function Recorder({ selectedLanguage }) {
  const [isRecording, setIsRecording] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [audioUrl, setAudioUrl] = useState(null);
  const [recordingDuration, setRecordingDuration] = useState(0);
  const mediaRecorderRef = useRef(null);
  const audioChunksRef = useRef([]);
  const greetingAudioRef = useRef(null);
  const timerRef = useRef(null);

  // Play greeting at the start
  useEffect(() => {
    if (selectedLanguage) {
      const greetingAudio = new Audio(`${process.env.PUBLIC_URL}/Audio/${selectedLanguage}.mp3`);
      greetingAudioRef.current = greetingAudio;
      greetingAudio.play().catch((error) => {
        console.error('Audio playback failed:', error);
      });
    }
  }, [selectedLanguage]);

  // Start recording and update the duration
  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      mediaRecorderRef.current = new MediaRecorder(stream);
      mediaRecorderRef.current.ondataavailable = (event) => {
        audioChunksRef.current.push(event.data);
      };
      mediaRecorderRef.current.onstop = () => {
        const audioBlob = new Blob(audioChunksRef.current, { type: 'audio/wav' });
        setAudioUrl(URL.createObjectURL(audioBlob));
        audioChunksRef.current = [];
        clearInterval(timerRef.current);
        setRecordingDuration(0);
      };
      mediaRecorderRef.current.start();
      setIsRecording(true);
      setIsPaused(false);

      // Timer for recording duration
      timerRef.current = setInterval(() => {
        setRecordingDuration((prev) => prev + 1);
      }, 1000);
    } catch (error) {
      console.error('Error accessing microphone:', error);
      alert('Microphone access is required for recording.');
    }
  };

  const stopRecording = () => {
    mediaRecorderRef.current.stop();
    setIsRecording(false);
    setIsPaused(false);
  };

  const pauseRecording = () => {
    mediaRecorderRef.current.pause();
    setIsPaused(true);
  };

  const resumeRecording = () => {
    mediaRecorderRef.current.resume();
    setIsPaused(false);
  };

  const handleDownload = () => {
    if (audioUrl) {
      const link = document.createElement('a');
      link.href = audioUrl;
      link.download = 'recording.wav';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } else {
      alert('No audio available to download.');
    }
  };

  const uploadToGoogleDrive = () => {
    alert('🚀 Google Drive upload feature coming soon!');
  };

  const formatDuration = (seconds) => {
    const mins = String(Math.floor(seconds / 60)).padStart(2, '0');
    const secs = String(seconds % 60).padStart(2, '0');
    return `${mins}:${secs}`;
  };

  return (
    <div className="recorder-container">
      <h1>Recording in: {selectedLanguage}</h1>
      <div className={`mic-icon ${isRecording ? 'recording' : ''}`}>🎤</div>
      <p>{isRecording && `Recording Duration: ${formatDuration(recordingDuration)}`}</p>
      <div className="button-container">
        {!isRecording && <button onClick={startRecording} className="startreco">Start Recording</button>}
        {isRecording && !isPaused && <button onClick={pauseRecording} className="startreco">Pause</button>}
        {isPaused && <button onClick={resumeRecording} className="startreco">Resume</button>}
        {isRecording && <button onClick={stopRecording} className="startreco">Stop Recording</button>}
      </div>
      {audioUrl && (
        <div className="audio-preview">
          <h3>Recorded Audio:</h3>
          <audio controls src={audioUrl}></audio>
          <div className="download-buttons">
            <button className="drive-button" onClick={handleDownload}>Download to Device</button>
            <button onClick={uploadToGoogleDrive} className="drive-button">Upload to Google Drive</button>
          </div>
        </div>
      )}
    </div>
  );
}

export default Recorder;
