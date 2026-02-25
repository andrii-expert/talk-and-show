
import React from 'react';
import { Mic, MicOff, Video, VideoOff, ScreenShare, ScreenShareOff, Phone } from 'lucide-react';

interface CallControlsProps {
  isMuted: boolean;
  isCameraOff: boolean;
  isScreenSharing: boolean;
  onToggleMute: () => void;
  onToggleCamera: () => void;
  onToggleScreenShare: () => void;
  onLeaveCall: () => void;
}

const CallControls = ({
  isMuted,
  isCameraOff,
  isScreenSharing,
  onToggleMute,
  onToggleCamera,
  onToggleScreenShare,
  onLeaveCall,
}: CallControlsProps) => {
  return (
    <div className="bg-slate-800/90 backdrop-blur-xl border-t border-slate-700/50 p-4">
      <div className="flex items-center justify-center space-x-4">
        {/* Microphone Toggle */}
        <button
          onClick={onToggleMute}
          className={`p-4 rounded-full transition-all duration-200 ${
            isMuted
              ? 'bg-red-500 hover:bg-red-600 shadow-lg shadow-red-500/25'
              : 'bg-slate-700 hover:bg-slate-600'
          }`}
        >
          {isMuted ? (
            <MicOff className="w-6 h-6 text-white" />
          ) : (
            <Mic className="w-6 h-6 text-white" />
          )}
        </button>

        {/* Camera Toggle */}
        <button
          onClick={onToggleCamera}
          className={`p-4 rounded-full transition-all duration-200 ${
            isCameraOff
              ? 'bg-red-500 hover:bg-red-600 shadow-lg shadow-red-500/25'
              : 'bg-slate-700 hover:bg-slate-600'
          }`}
        >
          {isCameraOff ? (
            <VideoOff className="w-6 h-6 text-white" />
          ) : (
            <Video className="w-6 h-6 text-white" />
          )}
        </button>

        {/* Screen Share Toggle */}
        <button
          onClick={onToggleScreenShare}
          className={`p-4 rounded-full transition-all duration-200 ${
            isScreenSharing
              ? 'bg-blue-500 hover:bg-blue-600 shadow-lg shadow-blue-500/25'
              : 'bg-slate-700 hover:bg-slate-600'
          }`}
        >
          {isScreenSharing ? (
            <ScreenShareOff className="w-6 h-6 text-white" />
          ) : (
            <ScreenShare className="w-6 h-6 text-white" />
          )}
        </button>

        {/* Leave Call */}
        <button
          onClick={onLeaveCall}
          className="p-4 rounded-full bg-red-500 hover:bg-red-600 transition-all duration-200 shadow-lg shadow-red-500/25"
        >
          <Phone className="w-6 h-6 text-white transform rotate-[135deg]" />
        </button>
      </div>

      {/* Status Indicators */}
      <div className="flex items-center justify-center mt-3 space-x-4 text-sm text-slate-400">
        {isMuted && (
          <span className="flex items-center space-x-1">
            <MicOff className="w-4 h-4" />
            <span>Muted</span>
          </span>
        )}
        {isCameraOff && (
          <span className="flex items-center space-x-1">
            <VideoOff className="w-4 h-4" />
            <span>Camera Off</span>
          </span>
        )}
        {isScreenSharing && (
          <span className="flex items-center space-x-1">
            <ScreenShare className="w-4 h-4 text-blue-400" />
            <span className="text-blue-400">Sharing Screen</span>
          </span>
        )}
      </div>
    </div>
  );
};

export default CallControls;
