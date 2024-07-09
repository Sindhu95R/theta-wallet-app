from pymongo import MongoClient
from pymongo.errors import ConnectionFailure, OperationFailure

def get_db():
    try:
        # Connect to MongoDB and specify the database name
        client = MongoClient('mongodb://localhost:27017/')
        db = client['theta_transactions']
        
        # Test the connection
        client.admin.command('ismaster')
        print("MongoDB connection successful")
        
        return db
    except ConnectionFailure as e:
        print(f"MongoDB connection failed: {e}")
        return None

# Function to check if the connection is successful and the database exists
def check_db_connection():
    db = get_db()
    if db is not None:
        print(f"Connected to database: {db.name}")
        try:
            # List collections to verify database access
            collection_names = db.list_collection_names()
            print(f"Collections in the database: {collection_names}")
            return True
        except OperationFailure as e:
            print(f"Failed to access database: {e}")
            return False
    else:
        print("Failed to connect to the database")
        return False

# Test the connection and database operations
if __name__ == "__main__":
    if check_db_connection():
        print("Database connection and access verified successfully.")
    else:
        print("Failed to verify database connection and access.")
