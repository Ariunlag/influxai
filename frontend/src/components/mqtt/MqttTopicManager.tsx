// MqttTopicManager.tsx
import React, { useState, useEffect } from 'react';
import MqttPanel from './MqttPanel';
import DuplicatePanel from './DuplicatePanel';

import { useMqttStore } from '../../store/useMqttStore';


const MqttTopicManager: React.FC = () => {
  const addMessage = useMqttStore(state => state.addMessage);
  const [selectedGroup, setSelectedGroup] = useState<string[] | null>(null);

  useEffect(() => {
    const ws = new WebSocket('ws://localhost:8000/ws');

    ws.onopen = () => {
      console.log('[WebSocket] Connected');
    };

    ws.onmessage = (event) => {
      console.log('[WebSocket] Message received:', event.data);
      addMessage(event.data);
    };

    ws.onerror = (err) => {
      console.error('[WebSocket] Error:', err);
    };
    
    ws.onclose = () => {
      console.log('[WebSocket] Closed');
    };
    return () => ws.close();
  }, []);


  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1rem', width: '100vw' }}>
      <MqttPanel />
      <DuplicatePanel selectedGroup={selectedGroup} setSelectedGroup={setSelectedGroup} />
    </div>
  );
};

export default MqttTopicManager;