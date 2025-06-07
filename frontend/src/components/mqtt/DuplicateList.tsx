import React from 'react';

interface DuplicateGroup {
    topics: string[];
}

interface Props {
    duplicates: DuplicateGroup[];
    onUnsubscribe: (topic: string) => void;
}

const DuplicateList: React.FC<Props> = ({ duplicates, onUnsubscribe }) => {
  if (duplicates.length === 0) return null;

  return (
    <div style={{ marginTop: '1rem', padding: '1rem', background: '#222', borderRadius: '6px' }}>
      <h3 style={{ color: 'gold' }}>Duplicate Topics Detected</h3>
      {duplicates.map((group, i) => (
        <div key={i} style={{ marginBottom: '1rem' }}>
          <p style={{ color: '#ddd' }}>⚠ Group {i + 1}</p>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
            {group.topics.map((t) => (
              <div
                key={t}
                style={{
                  backgroundColor: '#444',
                  color: 'white',
                  padding: '4px 10px',
                  borderRadius: '12px',
                  display: 'flex',
                  alignItems: 'center',
                }}
              >
                {t}
                <button
                  onClick={() => onUnsubscribe(t)}
                  style={{
                    background: 'none',
                    border: 'none',
                    color: 'red',
                    marginLeft: '8px',
                    fontWeight: 'bold',
                    cursor: 'pointer',
                  }}
                >
                  ×
                </button>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default DuplicateList;