
import React from 'react';
import ParticipantVideo from './ParticipantVideo';

interface Participant {
  id: string;
  name: string;
  isMuted: boolean;
  isCameraOff: boolean;
  isScreenSharing: boolean;
  isLocalUser: boolean;
  stream?: MediaStream | null;
}

interface ParticipantGridProps {
  participants: Participant[];
}

const ParticipantGrid = ({ participants }: ParticipantGridProps) => {
  const getGridClass = () => {
    const count = participants.length;
    if (count === 1) return 'grid-cols-1';
    if (count === 2) return 'grid-cols-2';
    if (count <= 4) return 'grid-cols-2';
    if (count <= 6) return 'grid-cols-3';
    return 'grid-cols-4';
  };

  return (
    <div className={`grid ${getGridClass()} gap-4 h-full`}>
      {participants.map((participant) => (
        <ParticipantVideo key={participant.id} participant={participant} />
      ))}
    </div>
  );
};

export default ParticipantGrid;
