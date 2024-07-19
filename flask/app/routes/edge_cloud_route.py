from flask import Blueprint, request, jsonify, session, send_file
import requests
import os


edge_cloud_bp = Blueprint('edgecloud', __name__)

@edge_cloud_bp.route('/upload', methods=['POST'])
def upload_file():
    if 'file' not in request.files:
        return jsonify({"error": "No file part"}), 400
    file = request.files['file']
    if file.filename == '':
        return jsonify({"error": "No selected file"}), 400

    # Get the current working directory
    current_dir = os.getcwd()
    temp_dir = os.path.join(current_dir, 'images')
    
    # Create the directory if it doesn't exist
    if not os.path.exists(temp_dir):
        os.makedirs(temp_dir)
    
    # Save the file in the temporary directory
    temp_file_path = os.path.join(temp_dir, file.filename)
    file.save(temp_file_path)

    # Prepare the payload
    payload = {
        "jsonrpc": "2.0",
        "method": "edgestore.PutFile",
        "params": [{"path": temp_file_path}],
        "id": 1
    }

    # Make the POST request to the specified URL
    response = requests.post('http://localhost:19888/rpc', json=payload)

    # Remove the temporary file
    try:
        os.remove(temp_file_path)
    except OSError as e:
        print(f"Error deleting file {temp_file_path}: {e}")

    # Return the response from the external server
    return jsonify(response.json())

@edge_cloud_bp.route('/getfile', methods=['POST'])
def get_file():
    data = request.get_json()
    if 'key' not in data:
        return jsonify({"error": "No key provided"}), 400
    key = data['key']

    # Prepare the payload
    payload = {
        "jsonrpc": "2.0",
        "method": "edgestore.GetFile",
        "params": [{"key": key}],
        "id": 1
    }

    # Make the POST request to the specified URL
    headers = {'Content-Type': 'application/json'}
    response = requests.post('http://localhost:19888/rpc', json=payload, headers=headers)

    if response.status_code != 200:
        return jsonify({"error": "Failed to retrieve file path"}), response.status_code

    response_data = response.json()
    if 'result' not in response_data or 'path' not in response_data['result']:
        return jsonify({"error": "Invalid response from server"}), 400

    file_path = response_data['result']['path']

    # Return the file directly
    return send_file(file_path, as_attachment=True)