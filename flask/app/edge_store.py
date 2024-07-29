import subprocess

def start_edgestore():
    command = "./bin/edgestore"
    args = ["start", "--config=./privatenet/single-node/node", "--password=qwertyuiop"]

    try:
        # Run the command
        result = subprocess.run([command] + args, check=True, stderr=subprocess.PIPE)
        
        # Capture and print the output
        print("Command executed successfully.")
        print("Output:\n", result.stdout.decode())
        print("Errors (if any):\n", result.stderr.decode())
        
    except subprocess.CalledProcessError as e:
        # Print error if the command fails
        print("Command failed with return code:", e.returncode)
        print("Error output:\n", e.stderr.decode())

if __name__ == "__main__":
    start_edgestore()