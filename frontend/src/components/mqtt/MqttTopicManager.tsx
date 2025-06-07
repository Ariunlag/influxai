import React from 'react';
import SubscribeInput from './SubscribeInput';
import SubscribedTopicsList from './SubscribedTopicsList';
import DuplicateList from './DuplicateList';
import MqttMessageLog from './MqttMessageLog';
import { useMqttStore } from '../../store/useMqttStore';

const MqttTopicManager: React.FC = () => {
  const topics = useMqttStore(state => state.topics);
  const messages = useMqttStore(state => state.messages);
  const duplicates = useMqttStore(state => state.duplicates);
  const duplicateMsgs = useMqttStore(state => state.duplicateMsgs);

  const addTopic = useMqttStore(state => state.addTopic);
  const removeTopic = useMqttStore(state => state.removeTopic);
  const addMessage = useMqttStore(state => state.addMessage);

  const hasDuplicates = duplicates.length > 0;

  const handleSubscribe = (topic: string) => {
    addTopic(topic);
    addMessage(`Subscribed to: ${topic}`);
  };

  const handleUnsubscribe = (topic: string) => {
    removeTopic(topic);
    addMessage(`Unsubscribed from: ${topic}`);
  };

  return (
    <div style={{ display: 'flex', height: '100vh' }}>

      {/* Left Sidebar */}
      <div style={{ width: '350px', display: 'flex', flexDirection: 'column', background: '#111', color: '#fff' }}>

        <div style={{ padding: '1rem' }}>
          <SubscribeInput onSubscribe={handleSubscribe} />
        </div>

        <div style={{ flex: 1, overflowY: 'auto', padding: '1rem' }}>
          <SubscribedTopicsList topics={topics} onUnsubscribe={handleUnsubscribe} />
          {hasDuplicates && (
            <DuplicateList duplicates={duplicates} onUnsubscribe={handleUnsubscribe} />
          )}
        </div>

        <div style={{ height: '150px', overflowY: 'auto', background: '#222', padding: '1rem', borderTop: '1px solid #444' }}>
          <h4 style={{ color: 'gold' }}>⚠ Duplicate Messages</h4>
          {duplicateMsgs.length === 0 ? (
            <p style={{ color: '#888', fontSize: '0.9rem' }}>No duplicates yet.</p>
          ) : (
            duplicateMsgs.map((msg, i) => (
              <div key={i} style={{ fontSize: '0.9rem', color: '#ddd' }}>{msg}</div>
            ))
          )}
        </div>
      </div>

      {/* Right Column */}
      <div style={{ flex: 1, background: '#1a1a1a', padding: '1rem' }}>
        <MqttMessageLog messages={messages} />
      </div>

    </div>
  );
};

export default MqttTopicManager;
