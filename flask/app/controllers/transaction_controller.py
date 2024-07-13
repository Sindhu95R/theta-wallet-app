from utils.db import get_db
from datetime import datetime
from bson import ObjectId
from decimal import Decimal, InvalidOperation
from utils.db import get_transactions_from_db

def validate_transaction_data(data):
    required_fields = ['wallet_address', 'sender', 'recipient', 'gas_fee', 'hash', 'date', 'time']
    missing_fields = [field for field in required_fields if field not in data]
    
    if missing_fields:
        return False, f"Missing required fields: {', '.join(missing_fields)}"
    
    return True, None

def serialize_document(document):
    if isinstance(document, ObjectId):
        return str(document)
    elif isinstance(document, dict):
        return {key: serialize_document(value) for key, value in document.items()}
    elif isinstance(document, list):
        return [serialize_document(item) for item in document]
    else:
        return document

def store_transaction(transaction_data):
    db = get_db()
    if db is None:
        return None, "Database connection failed"
    
    is_valid, error_message = validate_transaction_data(transaction_data)
    if not is_valid:
        return None, error_message
    
    transactions_collection = db['transactions']
    
    # Combine date and time into a single datetime object
    try:
        timestamp = datetime.strptime(f"{transaction_data['date']} {transaction_data['time']}", '%Y-%m-%d %H:%M:%S')
        
        # Create a new dictionary with the timestamp
        formatted_transaction = {
            'wallet_address': transaction_data['wallet_address'],
            'sender': transaction_data['sender'],
            'recipient': transaction_data['recipient'],
            'category': transaction_data['category'],
            'hash': transaction_data['hash'],
            'timestamp': timestamp
        }
        
    except ValueError:
        return None, "Invalid date or time format. Use YYYY-MM-DD for date and HH:MM:SS for time."
    
    # Convert gas_fee to float
    try:
        formatted_transaction['gas_fee'] = float(Decimal(str(transaction_data['gas_fee'])))
    except InvalidOperation:
        return None, "Invalid gas fee. Must be a valid number."
    
    try:
        result = transactions_collection.insert_one(formatted_transaction)
        return str(result.inserted_id), None
    except Exception as e:
        return None, f"Error inserting transaction: {str(e)}"

# Handle storing multiple transactions
def store_transactions(transactions_data):
    for transaction in transactions_data:
        transaction_id, error = store_transaction(transaction)
        if error:
            return None, error
    return True, None

# Get transactions function as it is
def get_transactions(wallet_address, page_number=1, limit_number=50, tx_type=None, is_equal_type=None):
    # Try to get transactions from the database
    db_transactions, total_pages = get_transactions_from_db(wallet_address, page_number, limit_number)
    
    if db_transactions:
        # Serialize the documents before returning
        serialized_transactions = [serialize_document(tx) for tx in db_transactions]
        return serialized_transactions, total_pages
    
    return [], 0


