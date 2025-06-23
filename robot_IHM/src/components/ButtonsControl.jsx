import React, { useState, useEffect, useRef } from 'react';
import { motion } from "framer-motion";
import { commands, stopCommand } from '../services/commandes';
import { sendData } from '../services/handleData';

export default function ButtonsControl(props) {
  const [isSaving, setIsSaving] = useState(false);
  const savedDataRef = useRef(props.data);

  // Keep ref updated with latest props.data
  useEffect(() => {
    savedDataRef.current = props.data;
  }, [props.data]);

  // Handle repeated data sending while isSaving
  useEffect(() => {
    if (!isSaving) return;

    let timeoutId;

    const sendRepeatedly = () => {
      sendData(savedDataRef.current);
      console.log(savedDataRef.current);
      timeoutId = setTimeout(sendRepeatedly, 100);
    };

    sendRepeatedly();

    return () => clearTimeout(timeoutId);
  }, [isSaving]);

  const toggleMode = () => {
    props.setIsAuto((prev) => !prev);
  };

  const handleSaving = () => {
    setIsSaving(prev => !prev);
  };

  return (
    <aside className="w-72 bg-black/80 backdrop-blur-md p-6 space-y-6 border-r border-green-500/20 shadow-inner z-10">
      <h2 className="text-xl font-bold tracking-widest text-green-400 border-b border-green-600 pb-2">[ MODES ]</h2>

      {/* Mode Buttons */}
      {commands.map((cmd) => (
        <motion.button
          key={cmd.cmd}
          onClick={() => props.handleCommand(cmd.cmd)}
          whileTap={{ scale: 0.98 }}
          whileHover={{ scale: 1.03 }}
          disabled={!props.connected || !props.isAuto}
          className="cursor-pointer w-full py-2 px-4 text-left rounded-md bg-green-900/40 hover:bg-green-800 disabled:bg-gray-800 text-green-300 transition border border-green-700 shadow-md"
        >
          {cmd.label.toUpperCase()}
        </motion.button>
      ))}
      <div className="pt-4 border-t border-green-800">
        <button
          onClick={() => props.handleCommand(stopCommand)}
          className="w-full py-2 px-4 rounded-md bg-red-700 hover:bg-red-600 text-white font-semibold shadow-md transition"
        >
          ⛔ Stop Robot
        </button>
      </div>

      {/* Mode Switch */}
      <div className="pt-6 border-t border-green-800">
        <p className="text-sm mb-2">[ MODE SWITCH ]</p>
        <div className="flex items-center justify-between">
          <span className="text-xs">{props.isAuto ? "AUTO" : "MANUAL"}</span>
          <div
            onClick={toggleMode}
            className={`w-16 h-8 flex items-center rounded-full p-1 cursor-pointer transition ${props.isAuto ? "bg-green-600" : "bg-gray-700"}`}
          >
            <motion.div
              animate={{ x: props.isAuto ? 32 : 0 }}
              transition={{ type: "spring", stiffness: 400 }}
              className="w-6 h-6 bg-green-300 rounded-full shadow-md"
            />
          </div>
        </div>
      </div>

      <div className="pt-4 border-t border-green-800">
        <button
          onClick={handleSaving}
          className={`w-full flex items-center justify-center gap-2 py-2 px-4 rounded-md ${isSaving ? "bg-gray-700 hover:bg-gray-600" : "bg-green-700 hover:bg-green-600"} text-white font-semibold transition`}
        >
          {isSaving && <span className="w-3 h-3 rounded-full bg-red-500 animate-pulse" />}
          {isSaving ? "Saving..." : "Start Saving Data"}
        </button>
      </div>
      
    </aside>
  );
}
