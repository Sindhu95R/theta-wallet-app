import sys

sys.dont_write_bytecode = True

from flask import Flask
from flask_cors import CORS

from app.routes.admin import admin


app = Flask(__name__)

app.config["JSON_SORT_KEYS"] = False

app.register_blueprint(admin, url_prefix="/api")


CORS(app)


if __name__ == "__main__":
    app.debug = True
    app.run()
