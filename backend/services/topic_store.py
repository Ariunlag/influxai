import json
import os

TOPIC_FILE = "subscribed_topics.json"

def save_topics(topics: set[str]):
    with open(TOPIC_FILE, 'w') as f:
        json.dump(list(topics), f)

def load_topics() -> set[str]:
    if not os.path.exists(TOPIC_FILE):
        return set()
    with open(TOPIC_FILE, 'r') as f:
        topics = json.load(f)
    return set(topics)

def clear_topics():
    if os.path.exists(TOPIC_FILE):
        os.remove(TOPIC_FILE)