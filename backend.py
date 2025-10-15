from flask import Flask, render_template, request, jsonify

app = Flask(__name__)

# 1 Serve HTML UI
@app.route('/')
def home():
    return render_template('index.html')

# 2 Example backend route
@app.route('/api/open_lab', methods=['POST'])
def open_lab():
    data = request.get_json()
    lab_name = data.get('lab')
    print(f"Opening {lab_name}...")   # this prints in your VS Code terminal
    return jsonify({"message": f"{lab_name} opened successfully!"})

if __name__ == '__main__':
    app.run(debug=True)
