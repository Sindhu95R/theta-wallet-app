from flask import Blueprint, request, jsonify, session
from controllers.transaction_controller import store_transaction, get_transactions
from controllers.ai_controller import generate_ai_response

transaction_bp = Blueprint('transaction', __name__)

@transaction_bp.route('/transactions/<wallet_address>/qa', methods=['POST'])
def transaction_qa(wallet_address):
    user_query = request.json.get('query')
    if not user_query:
        return jsonify({"error": "No query provided"}), 400

    # Check if transactions are already stored in session
    if 'transactions' not in session:
        # Get the most recent transactions (adjust the limit as needed)
        transactions, _ = get_transactions(wallet_address, page_number=1, limit_number=10)
        if not transactions:
            return jsonify({"error": "No transactions found"}), 404
        # Store transactions in session
        session['transactions'] = transactions
    else:
        transactions = session['transactions']

    # Get conversation history from session or initialize it
    conversation_history = session.get('conversation_history', '')

    # Generate AI response
    ai_response = generate_ai_response(user_query, transactions, conversation_history)

    # Update conversation history
    conversation_history += f"\nUser: {user_query}\nAI: {ai_response}\n"
    session['conversation_history'] = conversation_history

    return jsonify({
        "query": user_query,
        "response": ai_response
    }), 200

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
