from utils.db import get_db
from datetime import datetime
from bson import ObjectId
from decimal import Decimal, InvalidOperation

def validate_transaction_data(data):
    required_fields = ['wallet_address', 'category', 'sender', 'recipient', 'gas_fee', 'hash', 'date', 'time']
    missing_fields = [field for field in required_fields if field not in data]
    
    if missing_fields:
        return False, f"Missing required fields: {', '.join(missing_fields)}"
    
    return True, None

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
        date_str = transaction_data['date']
        time_str = transaction_data['time']
        transaction_data['timestamp'] = datetime.strptime(f"{date_str} {time_str}", '%Y-%m-%d %H:%M:%S')
        
        # Remove the original date and time fields
        del transaction_data['date']
        del transaction_data['time']
    except ValueError:
        return None, "Invalid date or time format. Use YYYY-MM-DD for date and HH:MM:SS for time."
    
    # Convert gas_fee to Decimal for precise handling of small values
    try:
        transaction_data['gas_fee'] = float(Decimal(str(transaction_data['gas_fee'])))
    except InvalidOperation:
        return None, "Invalid gas fee. Must be a valid number."
    
    try:
        result = transactions_collection.insert_one(transaction_data)
        return str(result.inserted_id), None
    except Exception as e:
        return None, f"Error inserting transaction: {str(e)}"
