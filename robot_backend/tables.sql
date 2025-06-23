CREATE TABLE IF NOT EXISTS robots (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    model TEXT,
    timestamp DATETIME DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS ultraSonor_data (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    robot_id INTEGER NOT NULL,
    distance_cm REAL NOT NULL,       
    sensor_position TEXT,               
    FOREIGN KEY (robot_id) REFERENCES robots(id) ON DELETE CASCADE
);


CREATE TABLE IF NOT EXISTS line_follow_data (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    robot_id INTEGER NOT NULL,
    sensor_position TEXT NOT NULL,         
    state Boolean,                          
    FOREIGN KEY (robot_id) REFERENCES robots(id) ON DELETE CASCADE
);
