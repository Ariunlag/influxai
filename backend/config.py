from pydantic import BaseModel
import os

class Settings(BaseModel):
    mqtt_broker: str = os.getenv("MQTT_BROKER", "test.mosquitto.org")
    mqtt_port: int = int(os.getenv("MQTT_PORT", 1883))

    influx_url: str = os.getenv("INFLUX_URL", "http://localhost:8086")
    influx_token: str = os.getenv("INFLUX_TOKEN", "")
    influx_org: str = os.getenv("INFLUX_ORG", "my-org")
    influx_bucket: str = os.getenv("INFLUX_BUCKET", "my-bucket")

settings = Settings()
