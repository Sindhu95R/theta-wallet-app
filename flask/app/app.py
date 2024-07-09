from flask import Flask
from flask_cors import CORS
from routes.transaction_routes import transaction_bp

app = Flask(__name__)
CORS(app)

app.config["JSON_SORT_KEYS"] = False

app.register_blueprint(transaction_bp, url_prefix="/api")

if __name__ == '__main__':
    app.run(debug=True)
