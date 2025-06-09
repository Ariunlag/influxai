// DuplicatePanel.tsx
import React from 'react';
import DuplicateList from './DuplicateList';
import DuplicateGraph from './DuplicateGraph';
import { useMqttStore } from '../../../store/useMqttStore';

// Reuse the same sidebar and content styles
const sidebarStyle: React.CSSProperties = {
  width: '350px',
  display: 'flex',
  flexDirection: 'column',
  borderRight: '1px solid #444'
};

const contentStyle: React.CSSProperties = {
  flex: 1,
  overflowY: 'auto',
  background: '#222',
  padding: '1rem'
};

interface DuplicatePanelProps {
  selectedGroup: string[] | null;
  setSelectedGroup: (group: string[] | null) => void;
}

const DuplicatePanel: React.FC<DuplicatePanelProps> = ({ selectedGroup, setSelectedGroup }) => {
  const duplicates = useMqttStore(state => state.duplicates);

  return (
    <div style={{ display: 'flex', height: '40vh', width: '90vw', background: '#111', color: '#fff' }}>
      <div style={sidebarStyle}>
        <div style={{ padding: '1rem' }}>
          <h3 style={{ color: 'gold', margin: 0 }}>Duplicate Topic Groups</h3>
        </div>
        <div style={{ flex: 1, overflowY: 'auto', padding: '1rem' }}>
          <DuplicateList duplicates={duplicates} onSelectGroup={setSelectedGroup} />
        </div>
      </div>
      <div style={contentStyle}>
        <h3 style={{ color: 'gold', marginBottom: '0.5rem' }}>Duplicate Group Graph</h3>
        {selectedGroup ? (
          <DuplicateGraph topics={selectedGroup} onClose={() => setSelectedGroup(null)} />
        ) : (
          <p style={{ color: '#888' }}>Click a duplicate message to view its graph.</p>
        )}
      </div>
    </div>
  );
};

export default DuplicatePanel;