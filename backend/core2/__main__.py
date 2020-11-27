from .handler import CoreTCPHandler, MasterTCPServer
from .utils import log

HOST = "0.0.0.0"
PORT = 9191

if __name__ == "__main__":
    logger = log.get(__name__)
    while True:
        try:
            logger.info("Start TCP server")
            with MasterTCPServer((HOST, PORT), CoreTCPHandler) as server:
                server.serve_forever()
        except Exception:
            logger.exception("Server is down")
