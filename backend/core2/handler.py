import json
from http import HTTPStatus
from http.server import BaseHTTPRequestHandler
from socketserver import ThreadingTCPServer

from .utils import DBBroker, log

logger = log.get(__name__)


class MasterTCPServer(ThreadingTCPServer):
    allow_reuse_address = True


class CoreTCPHandler(BaseHTTPRequestHandler):
    protocol_version = "HTTP/1.1"

    def __init__(self, request, client_address, server):
        super().__init__(request, client_address, server)

    def _send_response(self, data):
        self.send_response_only(HTTPStatus.OK)
        self.send_header("Content-Type", "application/json")
        self.send_header("Connection", "close")
        self.end_headers()
        self.wfile.write(data.encode("utf-8"))

    def do_POST(self):
        content_length = int(self.headers["Content-Length"])
        post_data = self.rfile.read(content_length).decode("utf-8")
        try:
            decoded_data = json.loads(post_data)
            command = decoded_data["command"]
            data_id = decoded_data["data_id"]
        except json.JSONDecodeError:
            logger.exception("Bad POST message: %s", post_data)
            self._send_response('{"status": "error"}')
            return
        except KeyError:
            logger.exception("Bad decoded data: %s", decoded_data)
            self._send_response('{"status": "error"}')
            return

        logger.info("Get request. Command: %s, IMG_ID: %s", command, data_id)
        answer = '{"status": "error"}'
        if command == "check":
            try:
                status = DBBroker().test(data_id)
                answer = f'{{"status": {str(status).lower()}}}'
            except Exception:
                logger.exception("Check command failed: Unexpected exception")
        elif command == "do":
            try:
                result = DBBroker().get_data(data_id)
                if result:
                    answer = result.serialize()
            except Exception:
                logger.exception("Do command failed: Unexpected exception")
        else:
            logger.warn("Unsupported command: %s", command)
        logger.info("Send result for command: %s, data_id: %s", command, data_id)
        self._send_response(answer)
