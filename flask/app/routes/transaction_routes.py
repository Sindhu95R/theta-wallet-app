from flask import Blueprint, request, jsonify
from controllers.transaction_controller import store_transaction

transaction_bp = Blueprint('transaction', __name__)

@transaction_bp.route('/transaction', methods=['POST'])
def add_transaction():
    transaction_data = request.json
    if not transaction_data:
        return jsonify({"error": "No data provided"}), 400
    
    transaction_id, error = store_transaction(transaction_data)
    if error:
        return jsonify({"error": error}), 400
    
    return jsonify({"message": "Transaction stored successfully", "id": transaction_id}), 201
