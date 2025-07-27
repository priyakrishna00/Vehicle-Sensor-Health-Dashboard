from flask import Flask, jsonify, send_file, send_from_directory
from sensor_simulation import simulate_sensor_data
import pandas as pd

app = Flask(__name__)

@app.route('/sensor-data')
def sensor_data():
    data = simulate_sensor_data()
    df = pd.DataFrame(data)
    df.to_csv('sensor_log.csv', index=False)
    return jsonify(data)

@app.route('/download-csv')
def download_csv():
    return send_file('sensor_log.csv', as_attachment=True)

if __name__ == '__main__':
    app.run(debug=True)

@app.route('/')
def serve_index():
    return send_from_directory('../frontend', 'index.html')
