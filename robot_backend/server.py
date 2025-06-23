from flask import Flask, request, jsonify
from flask_cors import CORS
from database import get_db_connection, init_db

app = Flask(__name__)
CORS(app, origins=["http://localhost:5173"])

init_db()

@app.route('/data', methods=['POST'])
def insert_sensor_data():
    data = request.json
    ultraSonor_list = data.get('ultraSonor', [])
    line_follow_list = data.get('line_follow', [])

    if not isinstance(ultraSonor_list, list) or not isinstance(line_follow_list, list):
        return jsonify({'error': 'ultraSonor and line_follow must both be lists'}), 400

    conn = get_db_connection()
    cursor = conn.cursor()

    cursor.execute('INSERT INTO data DEFAULT VALUES')
    ref_id = cursor.lastrowid

    for ultraSonor in ultraSonor_list:
        distance_cm = ultraSonor.get('distance_cm')
        sensor_position = ultraSonor.get('sensor_position')
        if distance_cm is None or sensor_position is None:
            continue
        cursor.execute(
            'INSERT INTO ultraSonor_data (ref_id, distance_cm, sensor_position) VALUES (?, ?, ?)',
            (ref_id, distance_cm, sensor_position)
        )

    for lf in line_follow_list:
        sensor_pos = lf.get('sensor_pos')
        state = lf.get('state')
        if sensor_pos is None or state is None:
            continue
        cursor.execute(
            'INSERT INTO line_follow_data (ref_id, sensor_pos, state) VALUES (?, ?, ?)',
            (ref_id, sensor_pos, bool(state))
        )

    conn.commit()
    conn.close()

    return jsonify({'message': 'Sensor data stored', 'ref_id': ref_id}), 201

@app.route('/data', methods=['GET'])
def get_all_sensor_data():
    conn = get_db_connection()
    cursor = conn.cursor()

    cursor.execute('SELECT * FROM data ORDER BY id')
    data_rows = cursor.fetchall()

    all_data = []
    for row in data_rows:
        data_id = row['id']
        timestamp = row['current_time']

        cursor.execute(
            'SELECT distance_cm, sensor_position FROM ultraSonor_data WHERE ref_id = ? order by ref_id',
            (data_id,)
        )
        ultraSonor = [dict(r) for r in cursor.fetchall()]

        cursor.execute(
            'SELECT sensor_pos, state FROM line_follow_data WHERE ref_id = ? order by ref_id',
            (data_id,)
        )
        line_follow = [dict(r) for r in cursor.fetchall()]

        all_data.append({
            'ref_id': data_id,
            'timestamp': timestamp,
            'ultraSonor': ultraSonor,
            'line_follow': line_follow
        })

    conn.close()
    return jsonify(all_data), 200

@app.route('/data/<int:data_id>', methods=['GET'])
def get_sensor_data_by_id(data_id):
    conn = get_db_connection()
    cursor = conn.cursor()

    cursor.execute('SELECT * FROM data WHERE id = ?', (data_id,))
    data_row = cursor.fetchone()
    if data_row is None:
        conn.close()
        return jsonify({'error': 'Data ID not found'}), 404

    cursor.execute(
        'SELECT distance_cm, sensor_position FROM ultraSonor_data WHERE ref_id = ?',
        (data_id,)
    )
    ultraSonor = [dict(row) for row in cursor.fetchall()]

    cursor.execute(
        'SELECT sensor_pos, state FROM line_follow_data WHERE ref_id = ?',
        (data_id,)
    )
    line_follow = [dict(row) for row in cursor.fetchall()]

    conn.close()
    return jsonify({
        'ref_id': data_id,
        'timestamp': data_row['current_time'],
        'ultraSonor': ultraSonor,
        'line_follow': line_follow
    }), 200

@app.route('/')
def home():
    return 'Sensor Server Running'

if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0', port=5000)
