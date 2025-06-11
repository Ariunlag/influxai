class MessageStore:
    def __init__(self):
        self._messages = []

    def add(self, msg: str):
        print(f"[MessageStore] Storing message: {msg}")

        self._messages.append(msg)
        if len(self._messages) > 100:
            self._messages.pop(0)

    def list(self):
        return list(self._messages)

message_store = MessageStore()
