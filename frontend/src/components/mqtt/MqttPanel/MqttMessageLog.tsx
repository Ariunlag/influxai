import React from 'react';

interface Props {
  messages: string[];
}

const MqttMessageLog: React.FC<Props> = ({ messages }) => {
  return (
    <div style={{ maxHeight: '100%', overflowY: 'auto', background: '#111', padding: '1rem', borderRadius: '6px' }}>
      <h3 style={{ color: 'gold' }}>Received MQTT Messages</h3>
      {messages.length === 0 && <p style={{ color: '#777' }}>No messages yet.</p>}
      {messages.map((msg, i) => (
        <div key={i} style={{ fontFamily: 'monospace', fontSize: '0.9rem', marginBottom: '4px', color: '#eee' }}>
          {msg}
        </div>
      ))}
    </div>
  );
};

export default MqttMessageLog;
