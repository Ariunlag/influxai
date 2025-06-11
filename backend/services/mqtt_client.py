import json
import paho.mqtt.client as mqtt
from config import settings
from services.ingestion_manager import ingestion_manager
from services.socket_manager import socket_manager
from services.message_store import message_store
from services.topic_store import save_topics, load_topics
import asyncio


class MQTTService:
    def __init__(self):
        self.client = mqtt.Client()
        self.client.on_connect = self._on_connect
        self.client.on_message = self._on_message
        self.broker = settings.mqtt_broker
        self.port = settings.mqtt_port
        self.subscribed_topics = load_topics()

    def connect(self):
        self.client.connect(self.broker, self.port)
        self.client.loop_start()
        print(f"✅ Connected to MQTT broker at {self.broker}:{self.port}")

        for topic in self.subscribed_topics:
            self.subscribe(topic)
            print(f"⚡ Subscribed to {len(self.subscribed_topics)} topics: {self.subscribed_topics}")

    def subscribe(self, topic: str):
        self.client.subscribe(topic)
        self.subscribed_topics.add(topic)
        save_topics(self.subscribed_topics)
        print(f"⚡ Subscribed to topic: {topic}")

    def unsubscribe(self, topic: str):
        if topic in self.subscribed_topics:
            self.subscribed_topics.remove(topic)
            self.client.unsubscribe(topic)
            print(f"[MQTT] Unsubscribing from topic: {topic}")
        else:
            print(f"[MQTT] Not subscribed to topic: {topic}, cannot unsubscribe")
            return
       
    def _on_connect(self, client, userdata, flags, rc):
        print(f"MQTT connected with result code {rc}")

    def _on_message(self, client, userdata, msg):
        payload = msg.payload.decode('utf-8')
        topic = msg.topic

        print("\n========== [DEBUG: MQTT Received] ==========")
        print(f"Topic: {topic}")
        print(f"Raw Payload: {payload}")

        # Optional: try to parse JSON to understand its structure
        try:
            parsed = json.loads(payload)
            print(f"Parsed JSON:\n{json.dumps(parsed, indent=2)}")
        except json.JSONDecodeError:
            print("⚠️ Payload is not valid JSON.")

        print("=============================================\n")

        # Proceed with the usual logic
        ingestion_manager.ingest(topic, payload)
        formatted = f"[{topic}] {payload}"
        message_store.add(formatted)
        asyncio.create_task(socket_manager.broadcast(formatted))

    def clear_all(self):
        for topic in self.subscribed_topics:
            self.unsubscribe(topic)
        self.subscribed_topics.clear()

mqtt_service = MQTTService()
