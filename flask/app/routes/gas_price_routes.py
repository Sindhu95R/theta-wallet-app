from flask import Blueprint, jsonify, request
from controllers.gas_price_controller import get_gas_price_prediction

gas_price_bp = Blueprint('gas_price', __name__)

@gas_price_bp.route('/predict', methods=['GET'])
def predict_gas_price():
    chain = request.args.get('chain', default='eth')
    time_intervals = request.args.get('intervals', default='10m,30m,1h,4h,10h,1d').split(',')
    
    predictions, error = get_gas_price_prediction(chain, time_intervals)
    
    if error:
        return jsonify({"error": error}), 400
    
    return jsonify({
        "chain": chain,
        "predictions": predictions
    }), 200