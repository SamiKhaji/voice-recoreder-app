import React, { useState, useRef } from 'react';
import './recorder.css';

function Recorder() {
  const [isRecording, setIsRecording] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [audioUrl, setAudioUrl] = useState(null);
  const mediaRecorderRef = useRef(null);
  const audioChunksRef = useRef([]);

  const startRecording = async () => {
    const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
    mediaRecorderRef.current = new MediaRecorder(stream);
    mediaRecorderRef.current.ondataavailable = (event) => {
      audioChunksRef.current.push(event.data);
    };
    mediaRecorderRef.current.onstop = () => {
      const audioBlob = new Blob(audioChunksRef.current, { type: 'audio/wav' });
      setAudioUrl(URL.createObjectURL(audioBlob));
      audioChunksRef.current = [];
    };
    mediaRecorderRef.current.start();
    setIsRecording(true);
    setIsPaused(false);
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

  const uploadToGoogleDrive = () => {
    alert('Google Drive upload feature coming soon! 🚀');
  };

  return (
    <div className="recorder-container">
      <div className={`mic-icon ${isRecording ? 'recording' : ''}`}>
        🎤
      </div>
      <div className="button-container">
        {!isRecording && <button onClick={startRecording} className='startreco'>Start Recording</button>}
        {isRecording && !isPaused && <button onClick={pauseRecording} className='startreco'>Pause</button>}
        {isPaused && <button onClick={resumeRecording} className='startreco'>Resume</button>}
        {isRecording && <button onClick={stopRecording} className='startreco'>Stop Recording</button>}
      </div>
      {audioUrl && (
        <div className="audio-preview">
          <h3>Recorded Audio:</h3>
          <audio controls src={audioUrl}></audio>
          <div className="download-buttons">
            <a href={audioUrl} download="recording.wav" className="download-button">Download to Device</a>
            <button onClick={uploadToGoogleDrive} className="drive-button">Upload to Google Drive</button>
          </div>
        </div>
      )}
    </div>
  );
}

export default Recorder;
