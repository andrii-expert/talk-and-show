
import React, { useState, useRef, useEffect } from 'react';
import ParticipantGrid from './ParticipantGrid';
import CallControls from './CallControls';

interface VideoCallInterfaceProps {
  userName: string;
  onLeaveCall: () => void;
}

const VideoCallInterface = ({ userName, onLeaveCall }: VideoCallInterfaceProps) => {
  const [isMuted, setIsMuted] = useState(false);
  const [isCameraOff, setIsCameraOff] = useState(false);
  const [isScreenSharing, setIsScreenSharing] = useState(false);
  const [userStream, setUserStream] = useState<MediaStream | null>(null);
  const [screenStream, setScreenStream] = useState<MediaStream | null>(null);

  useEffect(() => {
    startUserMedia();
    return () => {
      stopAllStreams();
    };
  }, []);

  const startUserMedia = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: !isCameraOff,
        audio: !isMuted
      });
      setUserStream(stream);
      console.log('User media started successfully');
    } catch (error) {
      console.error('Error accessing user media:', error);
    }
  };

  const stopAllStreams = () => {
    if (userStream) {
      userStream.getTracks().forEach(track => track.stop());
    }
    if (screenStream) {
      screenStream.getTracks().forEach(track => track.stop());
    }
  };

  const handleScreenShare = async () => {
    if (!isScreenSharing) {
      try {
        const stream = await navigator.mediaDevices.getDisplayMedia({
          video: true,
          audio: true
        });
        
        setScreenStream(stream);
        setIsScreenSharing(true);
        console.log('Screen sharing started successfully');

        // Listen for when user stops sharing via browser UI
        stream.getVideoTracks()[0].addEventListener('ended', () => {
          setIsScreenSharing(false);
          setScreenStream(null);
          console.log('Screen sharing stopped by user');
        });
      } catch (error) {
        console.error('Error starting screen share:', error);
        setIsScreenSharing(false);
      }
    } else {
      // Stop screen sharing
      if (screenStream) {
        screenStream.getTracks().forEach(track => track.stop());
        setScreenStream(null);
      }
      setIsScreenSharing(false);
      console.log('Screen sharing stopped');
    }
  };

  const handleToggleMute = () => {
    setIsMuted(!isMuted);
    if (userStream) {
      userStream.getAudioTracks().forEach(track => {
        track.enabled = isMuted; // Flip because we're toggling
      });
    }
    console.log('Microphone toggled:', isMuted ? 'unmuted' : 'muted');
  };

  const handleToggleCamera = () => {
    setIsCameraOff(!isCameraOff);
    if (userStream) {
      userStream.getVideoTracks().forEach(track => {
        track.enabled = isCameraOff; // Flip because we're toggling
      });
    }
    console.log('Camera toggled:', isCameraOff ? 'on' : 'off');
  };

  // Mock participants data with real streams
  const participants = [
    { 
      id: '1', 
      name: userName, 
      isMuted, 
      isCameraOff, 
      isScreenSharing, 
      isLocalUser: true,
      stream: isScreenSharing ? screenStream : userStream
    },
    { 
      id: '2', 
      name: 'John Doe', 
      isMuted: false, 
      isCameraOff: false, 
      isScreenSharing: false, 
      isLocalUser: false,
      stream: null
    }
  ];

  return (
    <div className="min-h-screen flex flex-col">
      {/* Main Video Area */}
      <div className="flex-1 p-4">
        <ParticipantGrid participants={participants} />
      </div>

      {/* Controls */}
      <CallControls
        isMuted={isMuted}
        isCameraOff={isCameraOff}
        isScreenSharing={isScreenSharing}
        onToggleMute={handleToggleMute}
        onToggleCamera={handleToggleCamera}
        onToggleScreenShare={handleScreenShare}
        onLeaveCall={onLeaveCall}
      />
    </div>
  );
};

export default VideoCallInterface;
