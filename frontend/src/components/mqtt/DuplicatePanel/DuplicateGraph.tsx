import React from "react";

interface Props{
    topics: string[];
    onClose: () => void;
}

const DuplicateGraph: React.FC<Props> = ({ topics, onClose }) => {
     return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
        <h3 style={{ color: 'gold' }}>Graph for: {topics}</h3>
        <button
          onClick={onClose}
          style={{ background: 'transparent', border: '1px solid #888', color: '#fff', padding: '0.3rem 0.6rem', cursor: 'pointer' }}
        >
          Close
        </button>
      </div>
      <div style={{ background: '#333', height: '200px', borderRadius: '8px', display: 'flex', justifyContent: 'center', alignItems: 'center', color: '#ccc' }}>
        {/* Replace with actual chart component later */}
        [Graph of {topics} goes here]
      </div>
    </div>
  );
};


export default DuplicateGraph;