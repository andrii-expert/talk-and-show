
import React, { useRef, useEffect } from 'react';
import { Mic, MicOff, Video, VideoOff, ScreenShare } from 'lucide-react';

interface Participant {
  id: string;
  name: string;
  isMuted: boolean;
  isCameraOff: boolean;
  isScreenSharing: boolean;
  isLocalUser: boolean;
  stream?: MediaStream | null;
}

interface ParticipantVideoProps {
  participant: Participant;
}

const ParticipantVideo = ({ participant }: ParticipantVideoProps) => {
  const { name, isMuted, isCameraOff, isScreenSharing, isLocalUser, stream } = participant;
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (videoRef.current && stream) {
      videoRef.current.srcObject = stream;
    }
  }, [stream]);

  return (
    <div className="relative bg-slate-800 rounded-xl overflow-hidden aspect-video shadow-lg border border-slate-700/50">
      {/* Video Content */}
      <div className="absolute inset-0">
        {stream && !isCameraOff ? (
          <video
            ref={videoRef}
            autoPlay
            muted={isLocalUser} // Mute local video to prevent feedback
            playsInline
            className="w-full h-full object-cover"
          />
        ) : isCameraOff ? (
          <div className="flex items-center justify-center h-full bg-slate-700">
            <div className="text-center">
              <div className="w-16 h-16 bg-slate-600 rounded-full flex items-center justify-center mb-2 mx-auto">
                <span className="text-white text-xl font-bold">
                  {name.charAt(0).toUpperCase()}
                </span>
              </div>
              <VideoOff className="w-6 h-6 text-slate-400 mx-auto" />
            </div>
          </div>
        ) : isScreenSharing ? (
          <div className="flex items-center justify-center h-full bg-blue-900/50">
            <div className="text-center">
              <ScreenShare className="w-12 h-12 text-blue-400 mx-auto mb-2" />
              <p className="text-blue-300 text-sm">{name} is sharing screen</p>
            </div>
          </div>
        ) : (
          <div className="w-full h-full bg-gradient-to-br from-blue-600 to-purple-600 flex items-center justify-center">
            <div className="w-20 h-20 bg-white/20 rounded-full flex items-center justify-center">
              <span className="text-white text-2xl font-bold">
                {name.charAt(0).toUpperCase()}
              </span>
            </div>
          </div>
        )}
      </div>

      {/* Participant Info */}
      <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <span className="text-white text-sm font-medium truncate">
              {name} {isLocalUser && '(You)'}
            </span>
            {isScreenSharing && (
              <ScreenShare className="w-4 h-4 text-blue-400" />
            )}
          </div>
          
          <div className="flex items-center space-x-1">
            {isMuted ? (
              <div className="p-1 bg-red-500 rounded-full">
                <MicOff className="w-3 h-3 text-white" />
              </div>
            ) : (
              <div className="p-1 bg-green-500 rounded-full">
                <Mic className="w-3 h-3 text-white" />
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Local User Indicator */}
      {isLocalUser && (
        <div className="absolute top-3 right-3">
          <div className="bg-blue-600/80 backdrop-blur-sm rounded-full px-2 py-1">
            <span className="text-white text-xs font-medium">You</span>
          </div>
        </div>
      )}
    </div>
  );
};

export default ParticipantVideo;
