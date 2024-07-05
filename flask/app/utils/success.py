from flask import jsonify


class Success:
    def __new__(self, success, message):
        self.success = success
        self.data = message
        return jsonify({"status": self.success, "message": self.data})