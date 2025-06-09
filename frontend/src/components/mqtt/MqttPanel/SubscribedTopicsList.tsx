import React from 'react';

interface Props {
  topics: string[];
  onUnsubscribe: (topic: string) => void;
}

const SubscribedTopicsList: React.FC<Props> = ({ topics, onUnsubscribe }) => {
  return (
    <div style={{ marginBottom: '1rem' }}>
      <h4 style={{ color: 'gold' }}>Subscribed Topics</h4>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
        {topics.map((topic) => (
          <div
            key={topic}
            style={{
              padding: '6px 12px',
              backgroundColor: '#333',
              color: '#fff',
              borderRadius: '16px',
              display: 'flex',
              alignItems: 'center',
            }}
          >
            {topic}
            <button
              onClick={() => onUnsubscribe(topic)}
              style={{
                background: 'none',
                border: 'none',
                color: 'red',
                marginLeft: '8px',
                fontWeight: 'bold',
                cursor: 'pointer',
              }}
              title="Unsubscribe"
            >
              ×
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SubscribedTopicsList;
