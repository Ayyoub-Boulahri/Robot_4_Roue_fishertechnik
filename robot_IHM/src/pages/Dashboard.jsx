import React, { useEffect, useState } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { motion } from "framer-motion";
import { fetchData } from "../services/handleData";

const Dashboard = () => {
  const [sensorData, setSensorData] = useState([]);

  const captorUltraSonorCount = 4;
  const captorlineCount = 2;
  const maxSpeed = 23;

  useEffect(() => {
    const getData = async () => {
      try {
        const data = await fetchData();
        console.log("Fetched data:", data);
        setSensorData(data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    getData();
  }, []);

  // Normalize sensor_position strings to lowercase for consistent matching
  const normalizePosition = (pos) => pos.toLowerCase().trim();

  // Prepare ultraSonorSeries as an object mapping sensor_position to arrays of readings
  const ultraSonorSeries = {};

  sensorData.forEach((record) => {
    const timestamp = record.timestamp;
    record.ultraSonor.forEach(({ distance_cm, sensor_position }) => {
      const pos = normalizePosition(sensor_position);
      if (!ultraSonorSeries[pos]) ultraSonorSeries[pos] = [];
      ultraSonorSeries[pos].push({
        time: timestamp,
        distance: distance_cm,
      });
    });
  });

  const ultraPositions = Object.keys(ultraSonorSeries);

  // Gather unique timestamps across all sensors and sort them ascending
  const timestampsSet = new Set();
  ultraPositions.forEach((pos) => {
    ultraSonorSeries[pos].forEach(({ time }) => timestampsSet.add(time));
  });
  const allTimestamps = Array.from(timestampsSet).sort();

  // Build a map keyed by time for quick lookup of each sensor reading
  const readingsByTime = {};
  allTimestamps.forEach((time) => {
    readingsByTime[time] = {
      time,
      "front right": null,
      "front left": null,
      "center right": null,
      "center left": null,
    };
  });

  // Fill readingsByTime with actual data from each sensor position
  ultraPositions.forEach((pos) => {
    ultraSonorSeries[pos].forEach(({ time, distance }) => {
      if (readingsByTime[time]) {
        if (pos === "front right") readingsByTime[time]["front right"] = distance;
        else if (pos === "front left") readingsByTime[time]["front left"] = distance;
        else if (pos === "center right") readingsByTime[time]["center right"] = distance;
        else if (pos === "center left") readingsByTime[time]["center left"] = distance;
      }
    });
  });

  // Convert readingsByTime to array and get last 10 records for table display
  const combinedTableData = allTimestamps
    .map((time) => readingsByTime[time])
    .slice(-10);

  console.log("Combined table data:", combinedTableData);

  return (
    <div className="flex-1 bg-black text-green-400 p-4 sm:p-6 lg:p-8 font-mono">
      <motion.div
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="bg-neutral-900 border border-green-500/20 rounded-xl p-6 shadow-lg hover:scale-[1.02] transition">
          <p className="text-sm text-green-300 mb-1 tracking-wider">CAPTEUR ULTRASONORS</p>
          <h2 className="text-4xl font-bold tracking-tight">{captorUltraSonorCount}</h2>
        </div>
        <div className="bg-neutral-900 border border-green-500/20 rounded-xl p-6 shadow-lg hover:scale-[1.02] transition">
          <p className="text-sm text-green-300 mb-1 tracking-wider">CAPTEUR DE LIGNE</p>
          <h2 className="text-4xl font-bold tracking-tight">{captorlineCount}</h2>
        </div>
        <div className="bg-neutral-900 border border-green-500/20 rounded-xl p-6 shadow-lg hover:scale-[1.02] transition">
          <p className="text-sm text-green-300 mb-1 tracking-wider">ROBOT MAX SPEED</p>
          <h2 className="text-4xl font-bold tracking-tight">{maxSpeed} cm/s</h2>
        </div>
      </motion.div>

      {/* ultraSonor sensor charts */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
        {ultraPositions.map((pos, idx) => (
          <motion.div
            key={pos}
            className="bg-neutral-900 border border-green-500/10 rounded-xl p-4 shadow-md"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: idx * 0.1 }}
          >
            <h3 className="text-green-300 mb-3 text-lg">ultraSonor Sensor - {pos}</h3>
            <div className="overflow-x-auto">
              <div className="min-w-[800px]">
                <ResponsiveContainer width="100%" height={200}>
                  <LineChart data={ultraSonorSeries[pos]}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#1f1f1f" />
                    <XAxis
                      dataKey="time"
                      stroke="#8aff8a"
                      tickFormatter={(tick) => tick.split(" ")[1]}
                    />
                    <YAxis stroke="#8aff8a" domain={["auto", "auto"]} />
                    <Tooltip
                      contentStyle={{ backgroundColor: "#0f0f0f", borderRadius: "8px", border: "1px solid #22ff22" }}
                      labelStyle={{ color: "#00ff00" }}
                      formatter={(value) => `${value} cm`}
                    />
                    <Line type="monotone" dataKey="distance" stroke="#22ff22" strokeWidth={2} dot={false} activeDot={{ r: 5 }} />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Combined ultraSonor sensor table */}
      <motion.div
  className="bg-neutral-900 border border-green-500/10 rounded-xl p-5 overflow-auto shadow"
  initial={{ opacity: 0, y: 10 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.3 }}
>
  <h3 className="text-green-300 mb-2 font-semibold">UltraSonor Sensors Combined Table</h3>
  <table className="w-full text-sm text-green-200 border-separate border-spacing-x-4 border-spacing-y-1">
    <thead>
      <tr>
        <th className="text-left whitespace-normal max-w-[3rem]">#</th>
        <th className="text-left whitespace-normal max-w-[6rem]">Time</th>
        <th className="text-left whitespace-normal max-w-[8rem]">UltraSon<br />Front R</th>
        <th className="text-left whitespace-normal max-w-[8rem]">UltraSon<br />Front L</th>
        <th className="text-left whitespace-normal max-w-[8rem]">UltraSon<br />Center R</th>
        <th className="text-left whitespace-normal max-w-[8rem]">UltraSon<br />Center L</th>
        <th className="text-left whitespace-normal max-w-[8rem]">line<br />Front R</th>
        <th className="text-left whitespace-normal max-w-[8rem]">line<br />Front L</th>
        <th className="text-left whitespace-normal max-w-[8rem]">line<br />Center R</th>
        <th className="text-left whitespace-normal max-w-[8rem]">line<br />Center L</th>
      </tr>
    </thead>
    <tbody>
      {sensorData.map((d) => (
        <tr key={d.ref_id} className="hover:bg-green-500/10 transition">
          <td>{d.ref_id}</td>
          <td>{d.timestamp.split(" ")[1]}</td>
          <td>{d.ultraSonor[0]?.distance_cm}</td>
          <td>{d.ultraSonor[1]?.distance_cm}</td>
          <td>{d.ultraSonor[2]?.distance_cm}</td>
          <td>{d.ultraSonor[3]?.distance_cm}</td>
          <td>{d.line_follow[0]?.state}</td>
          <td>{d.line_follow[1]?.state}</td>
          <td>{d.line_follow[2]?.state}</td>
          <td>{d.line_follow[3]?.state}</td>
        </tr>
      ))}
    </tbody>
  </table>
</motion.div>

    </div>
  );
};

export default Dashboard;
