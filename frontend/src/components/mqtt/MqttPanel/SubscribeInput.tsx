import React, {useState} from 'react';

interface Props {
    onSubscribe: (topic: string) => void;
}

const SubscribeInput : React.FC<Props> = ({ onSubscribe }) => {
    const [topic, setTopic] = useState('');

    const handleSubmit =(e: React.FormEvent) => {
        e.preventDefault();
        if (topic.trim()) {
            onSubscribe(topic);
            setTopic('');
        }
    };

    return (
    <div style={{
      display: 'flex',
      alignItems: 'center',
      gap: '0.5rem',
    }}>
      <input
        type="text"
        placeholder="Enter subscription topic.."
        value={topic}
        onChange={(e) => setTopic(e.target.value)}
        style={{
          padding: '8px',
          width: '280px',
          borderRadius: '4px',
          border: '1px solid #444',
          backgroundColor: '#222',
          color: '#fff',
        }}
      />
      <button
        onClick={handleSubmit}
        style={{
          padding: '6px 12px',
          backgroundColor: 'limegreen',
          color: '#fff',
          border: 'none',
          borderRadius: '4px',
          fontSize: '1.2rem',
          cursor: 'pointer',
          fontWeight: 'bold',
        }}
        title="Subscribe"
      >
        ✓
      </button>
    </div>
  );
};

export default SubscribeInput;