from threading import Lock
from services.duplicate_detector import DuplicateDetector
from services.influx_writer import influx_writer
from services.message_store import message_store

class IngestionManager:
    _instance = None

    def __init__(self):
        self._batch = []  # list of (topic, payload)
        self._lock = Lock()
        self.detector = DuplicateDetector()

    @classmethod
    def instance(cls):
        if cls._instance is None:
            cls._instance = cls()
        return cls._instance

    def ingest(self, topic: str, payload: str):
        with self._lock:
            self._batch.append((topic, payload))
            message_store.add(f"{topic}: {payload}")
            # Immediately flush if not duplicate
            if not self.detector.is_duplicate(self._batch):
                for t, p in self._batch:
                    influx_writer.write_point(
                        measurement=t,
                        tags={"topic": t},
                        fields={"value": p}
                    )
                self._batch.clear()
            # else, leave pending until resolved via API

ingestion_manager = IngestionManager.instance()
