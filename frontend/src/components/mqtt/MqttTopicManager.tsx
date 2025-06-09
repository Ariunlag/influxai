// MqttTopicManager.tsx
import React, { useState } from 'react';
import MqttPanel from './MqttPanel';
import DuplicatePanel from './DuplicatePanel';

const MqttTopicManager: React.FC = () => {
  const [selectedGroup, setSelectedGroup] = useState<string[] | null>(null);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1rem', width: '100vw' }}>
      <MqttPanel />
      <DuplicatePanel selectedGroup={selectedGroup} setSelectedGroup={setSelectedGroup} />
    </div>
  );
};

export default MqttTopicManager;