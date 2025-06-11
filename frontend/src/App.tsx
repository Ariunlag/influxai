// App.tsx
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import MqttTopicManager from './components/mqtt/MqttTopicManager';
import './index.css';

export default function App() {
  const [ready, setReady] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    axios.get('http://localhost:8000/api/health')
      .then(res => {
        const { mqtt_connected, influx_connected } = res.data;
        if (mqtt_connected && influx_connected) {
          setReady(true);
        } else {
          setError('Services not yet connected');
        }
      })
      .catch(() => {
        setError('Could not reach backend; retrying…');
        setTimeout(() => window.location.reload(), 3000);
      });
  }, []);

  if (!ready) {
    return (
      <div style={{
        background: '#111',
        color: 'gold',
        height: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '1rem',
        textAlign: 'center',
      }}>
        {error || 'Waiting for MQTT & InfluxDB connections…'}
      </div>
    );
  }

  return (
    <div style={{ backgroundColor: '#111', minHeight: '100vh', color: '#fff', padding: '2rem' }}>
      <h1 style={{ textAlign: 'center', color: 'gold' }}>MQTT Dashboard</h1>
      <MqttTopicManager />
    </div>
  );
}
