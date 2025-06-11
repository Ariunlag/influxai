from fastapi import APIRouter
from services.mqtt_client import mqtt_service
from services.influx_writer import influx_writer

router = APIRouter()

@router.get("/health")
def health_check():
    return {
        "mqtt_connected": getattr(mqtt_service, "client", None) is not None,
        "influx_connected": getattr(influx_writer, "client", None) is not None
    }
