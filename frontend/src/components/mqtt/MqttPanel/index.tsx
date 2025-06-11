import React from 'react';
import SubscribeInput from './SubscribeInput';
import SubscribedTopicsList from './SubscribedTopicsList';
import MqttMessageLog from './MqttMessageLog';
import { subscribeTopic, unsubscribeTopic } from '../../../services/mqttApi';

import { useMqttStore } from '../../../store/useMqttStore';

// Sidebar (left) style
const sidebarStyle: React.CSSProperties = {
  width: '350px',
  display: 'flex',
  flexDirection: 'column',
  borderRight: '1px solid #444'
};

// Content (right) style
const contentStyle: React.CSSProperties = {
  flex: 1,
  overflowY: 'auto',
  background: '#222',
  padding: '1rem'
};

const MqttPanel: React.FC = () => {
  const topics = useMqttStore(state => state.topics);
  const messages = useMqttStore(state => state.messages);
  const addTopic = useMqttStore(state => state.addTopic);
  const removeTopic = useMqttStore(state => state.removeTopic);
  const addMessage = useMqttStore(state => state.addMessage);

  const handleSubscribe = async(topic: string) => {
    try {
      await subscribeTopic(topic);
      addTopic(topic);
    } catch {
      addMessage('Error subscribing from topic:');
    }
  };

  const handleUnsubscribe = async(topic: string) => {
    try {
      await unsubscribeTopic(topic);
      removeTopic(topic);
    } catch {
      addMessage('Error unsubscribing from topic:');
    }
  };

  return (
    <div style={{ display: 'flex', height: '60vh', width: '90vw', background: '#111', color: '#fff' }}>
      <div style={sidebarStyle}>
        <div style={{ padding: '1rem' }}>
          <SubscribeInput onSubscribe={handleSubscribe} />
        </div>
        <div style={{ flex: 1, overflowY: 'auto', padding: '1rem' }}>
          <SubscribedTopicsList topics={topics} onUnsubscribe={handleUnsubscribe} />
        </div>
      </div>
      <div style={contentStyle}>
        <MqttMessageLog messages={messages} />
      </div>
    </div>
  );
};

export default MqttPanel