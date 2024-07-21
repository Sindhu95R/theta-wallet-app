from flask import Flask, session
from flask_session import Session
import secrets
from flask_cors import CORS
from routes.transaction_routes import transaction_bp
from routes.gas_price_routes import gas_price_bp
from routes.edge_cloud_route import edge_cloud_bp
import os

app = Flask(__name__)
CORS(app)
secret_key = secrets.token_hex(24)
app.config["JSON_SORT_KEYS"] = False
app.config['SESSION_TYPE'] = 'filesystem'
app.config['SECRET_KEY'] = secret_key
Session(app)

app.register_blueprint(edge_cloud_bp, url_prefix="/api")
app.register_blueprint(transaction_bp, url_prefix="/api")
app.register_blueprint(gas_price_bp, url_prefix='/api/gas-price')


if __name__ == '__main__':
    port = int(os.environ.get('PORT', 5000))
    app.run(host='0.0.0.0', port=port)

