from flask import Blueprint, request, jsonify
from controllers.transaction_controller import store_transaction, get_transactions

transaction_bp = Blueprint('transaction', __name__)

@transaction_bp.route('/transactions/<wallet_address>', methods=['GET'])
def fetch_transactions(wallet_address):
    page_number = request.args.get('pageNumber', default=1, type=int)
    limit_number = request.args.get('limitNumber', default=50, type=int)
    tx_type = request.args.get('type', default=None, type=int)
    is_equal_type = request.args.get('isEqualType', default=None, type=lambda v: v.lower() == 'true')
    
    transactions, total_pages = get_transactions(wallet_address, page_number, limit_number, tx_type, is_equal_type)
    
    if transactions:
        return jsonify({
            "currentPageNumber": page_number,
            "totalPageNumber": total_pages,
            "transactions": transactions
        }), 200
    else:
        return jsonify({"error": "No transactions found"}), 404

@transaction_bp.route('/transaction', methods=['POST'])
def add_transaction():
    transaction_data = request.json
    if not transaction_data:
        return jsonify({"error": "No data provided"}), 400
    
    transaction_id, error = store_transaction(transaction_data)
    if error:
        return jsonify({"error": error}), 400
    
    return jsonify({"message": "Transaction stored successfully", "id": transaction_id}), 201
