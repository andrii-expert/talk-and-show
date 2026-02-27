
import React, { useState, useRef, useEffect } from 'react';
import { Video, VideoOff, Mic, MicOff } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

interface PreCallLobbyProps {
  onJoinCall: (name: string) => void;
}

const PreCallLobby = ({ onJoinCall }: PreCallLobbyProps) => {
  const [name, setName] = useState('');
  const [isCameraOn, setIsCameraOn] = useState(true);
  const [isMicOn, setIsMicOn] = useState(true);
  const [stream, setStream] = useState<MediaStream | null>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (isCameraOn) {
      startCamera();
    } else {
      stopCamera();
    }

    return () => {
      stopCamera();
    };
  }, [isCameraOn]);

  const startCamera = async () => {
    try {
      const mediaStream = await navigator.mediaDevices.getUserMedia({
        video: true,
        audio: isMicOn
      });
      setStream(mediaStream);
      if (videoRef.current) {
        videoRef.current.srcObject = mediaStream;
      }
      console.log('Camera started successfully');
    } catch (error) {
      console.error('Error accessing camera:', error);
      setIsCameraOn(false);
    }
  };

  const stopCamera = () => {
    if (stream) {
      stream.getTracks().forEach(track => {
        track.stop();
      });
      setStream(null);
    }
    if (videoRef.current) {
      videoRef.current.srcObject = null;
    }
  };

  const toggleCamera = () => {
    setIsCameraOn(!isCameraOn);
  };

  const toggleMic = () => {
    setIsMicOn(!isMicOn);
    if (stream) {
      stream.getAudioTracks().forEach(track => {
        track.enabled = !isMicOn;
      });
    }
  };

  const handleJoin = () => {
    if (name.trim()) {
      onJoinCall(name.trim());
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="bg-slate-800/50 backdrop-blur-xl rounded-2xl p-8 max-w-md w-full border border-slate-700/50 shadow-2xl">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-white mb-2">Join Video Call</h1>
          <p className="text-slate-300">Enter your name to start the call</p>
        </div>

        {/* Video Preview */}
        <div className="relative mb-6 rounded-xl overflow-hidden bg-slate-700 aspect-video">
          <div className="absolute inset-0 flex items-center justify-center">
            {isCameraOn && stream ? (
              <video
                ref={videoRef}
                autoPlay
                muted
                playsInline
                className="w-full h-full object-cover"
              />
            ) : isCameraOn ? (
              <div className="flex items-center justify-center h-full">
                <span className="text-white">Starting camera...</span>
              </div>
            ) : (
              <div className="flex items-center justify-center h-full">
                <VideoOff className="w-12 h-12 text-slate-400" />
              </div>
            )}
          </div>
          
          {/* Camera Controls */}
          <div className="absolute bottom-3 left-3 flex space-x-2">
            <button
              onClick={toggleCamera}
              className={`p-2 rounded-full transition-all ${
                isCameraOn 
                  ? 'bg-slate-600/80 hover:bg-slate-600' 
                  : 'bg-red-500/80 hover:bg-red-500'
              }`}
            >
              {isCameraOn ? (
                <Video className="w-4 h-4 text-white" />
              ) : (
                <VideoOff className="w-4 h-4 text-white" />
              )}
            </button>
            
            <button
              onClick={toggleMic}
              className={`p-2 rounded-full transition-all ${
                isMicOn 
                  ? 'bg-slate-600/80 hover:bg-slate-600' 
                  : 'bg-red-500/80 hover:bg-red-500'
              }`}
            >
              {isMicOn ? (
                <Mic className="w-4 h-4 text-white" />
              ) : (
                <MicOff className="w-4 h-4 text-white" />
              )}
            </button>
          </div>
        </div>

        {/* Name Input */}
        <div className="mb-6">
          <Input
            type="text"
            placeholder="Enter your name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="bg-slate-700/50 border-slate-600 text-white placeholder-slate-400 text-center text-lg"
            onKeyPress={(e) => e.key === 'Enter' && handleJoin()}
          />
        </div>

        {/* Join Button */}
        <Button
          onClick={handleJoin}
          disabled={!name.trim()}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 text-lg font-semibold transition-all disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Join Call
        </Button>
      </div>
    </div>
  );
};

export default PreCallLobby;
