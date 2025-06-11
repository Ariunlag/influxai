from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from api.mqtt import router as mqtt_router
from api.health import router as health_router
from api.socket import router as socket_router
from services.mqtt_client import mqtt_service
from services.influx_writer import influx_writer

app = FastAPI()

# CORS middleware – allow your frontend origin (or all origins for dev)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],  # or ["*"] to allow any
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# mount your routers
app.include_router(mqtt_router, prefix="/api")
app.include_router(health_router, prefix="/api")
app.include_router(socket_router)

@app.on_event("startup")
async def on_startup():
    mqtt_service.connect()
    influx_writer.connect()

@app.get("/")
def root():
    return {"message": "Backend started and services connected"}
