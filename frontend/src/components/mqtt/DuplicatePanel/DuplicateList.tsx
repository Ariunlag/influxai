import React from 'react';

interface DuplicateGroup {
  topics: string[];
}

interface Props {
  duplicates: DuplicateGroup[];
  onSelectGroup: (topics: string[]) => void;
}

const DuplicateList: React.FC<Props> = ({ duplicates, onSelectGroup }) => {
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
                onClick={() => onSelectGroup(group.topics)}
                style={{
                  backgroundColor: '#444',
                  color: 'white',
                  padding: '4px 10px',
                  borderRadius: '12px',
                  display: 'flex',
                  alignItems: 'center',
                  cursor: 'pointer',
                }}
                title="Click to view graph for duplicate group"
              >
                {t}
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default DuplicateList;
