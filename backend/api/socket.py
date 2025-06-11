from fastapi import APIRouter, WebSocket, WebSocketDisconnect
from services.socket_manager import socket_manager

router = APIRouter()

@router.websocket("/ws")
async def websocket_endpoint(ws: WebSocket):
    await socket_manager.connect(ws)
    try:
        while True:
            await ws.receive_text()
    except WebSocketDisconnect as e:
        print(f"[API] WebSocket disconnect error: {e}")
    except Exception as e:
        print(f"[API] WebSocket error: {e}")