import React from "react";
import MqttTopicManager from "./components/mqtt/MqttTopicManager";

function App(){
  return(
    <div style={{ backgroundColor: '#111', minHeight: '100vh', color: '#fff', padding: '2rem' }}>
      <h3 style={{ textAlign: 'center', color: 'gold' }}>MQTT Dashboard</h3>
      <MqttTopicManager />
    </div>
  )
}

export default App;