from flask import Flask, render_template, request, jsonify

app = Flask(__name__)

# Serve UI
@app.route('/')
def home():
    return render_template('index.html')

# API: called when user clicks "Open" on a lab
@app.route('/api/open_lab', methods=['POST'])
def open_lab():
    data = request.get_json() or {}
    lab_name = data.get('lab', 'Unknown')
    print(f"[backend] Opening: {lab_name}")   # check VSCode terminal
    return jsonify({"message": f"{lab_name} opened successfully!"})
# API: called when user clicks "Cloud" icon
@app.route('/api/check_cloud_status')
def check_cloud_status():
    print("[backend] Cloud icon clicked")
    return jsonify({"status": "All systems operational"})

if __name__ == '__main__':
    app.run(debug=True)

