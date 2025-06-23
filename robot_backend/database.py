import sqlite3

DB_NAME = "sensor_data.db"

def get_db_connection():
    conn = sqlite3.connect(DB_NAME)
    conn.row_factory = sqlite3.Row
    return conn

def init_db():
    conn = get_db_connection()
    cursor = conn.cursor()

    cursor.execute("""
    CREATE TABLE IF NOT EXISTS data (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        current_time DATETIME DEFAULT CURRENT_TIMESTAMP
    )
    """)

    cursor.execute("""
    CREATE TABLE IF NOT EXISTS ultraSonor_data (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        ref_id INTEGER NOT NULL,
        distance_cm REAL NOT NULL,
        sensor_position TEXT,
        FOREIGN KEY (ref_id) REFERENCES data(id) ON DELETE CASCADE
    )
    """)

    cursor.execute("""
    CREATE TABLE IF NOT EXISTS line_follow_data (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        ref_id INTEGER NOT NULL,
        sensor_pos TEXT NOT NULL,
        state BOOLEAN NOT NULL,
        FOREIGN KEY (ref_id) REFERENCES data(id) ON DELETE CASCADE
    )
    """)

    conn.commit()
    conn.close()
