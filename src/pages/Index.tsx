
import React, { useState } from 'react';
import VideoCallInterface from '../components/VideoCallInterface';
import PreCallLobby from '../components/PreCallLobby';

const Index = () => {
  const [isInCall, setIsInCall] = useState(false);
  const [userName, setUserName] = useState('');

  const handleJoinCall = (name: string) => {
    setUserName(name);
    setIsInCall(true);
  };

  const handleLeaveCall = () => {
    setIsInCall(false);
    setUserName('');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900">
      {!isInCall ? (
        <PreCallLobby onJoinCall={handleJoinCall} />
      ) : (
        <VideoCallInterface userName={userName} onLeaveCall={handleLeaveCall} />
      )}
    </div>
  );
};

export default Index;
