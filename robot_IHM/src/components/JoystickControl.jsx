import React from 'react'
import { Joystick } from "react-joystick-component";
import { motion } from "framer-motion";
import { useState } from "react";
import { stopCommand } from '../services/commandes';

export default function JoystickControl(props) {
    const [dim, setDim] = useState(false);

    const handleMove = (e) => {
        const x = e.x;
        const y = e.y;
        const r = Math.round(Math.sqrt(x ** 2 + y ** 2) * 100);
        const teta = -Math.round(Math.atan2(x, y) * (180 / Math.PI));
        props.sendMessage(props.control_topic,"robot." + (dim ? "apply_velocity1D" : "apply_velocity2D") + `(${r},${teta})`);
    };
    
    const handleStop = () => props.sendMessage(props.control_topic, stopCommand);
    const toggleDim = () => setDim((prev) => !prev);


    return (
        <main className="flex-1 flex flex-col items-center justify-center px-4 md:px-10 py-12 gap-10 relative z-10">
            <h1 className="text-4xl md:text-5xl font-bold tracking-wider text-green-400 border-b border-green-600 pb-4">
                [ ROBOT CONTROL INTERFACE ]
            </h1>

            <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
                className="bg-black border border-green-800 rounded-lg p-6 shadow-xl backdrop-blur-md w-full max-w-md flex flex-col items-center"
            >
                <h2 className="text-green-300 text-lg mb-4">-- JOYSTICK --</h2>
                <div className="flex justify-center">
                    <Joystick
                        size={120}
                        baseColor="rgba(0,255,0,0.1)"
                        stickColor="#00FF00"
                        move={!props.isAuto ? handleMove : null}
                        stop={!props.isAuto ? handleStop : null}
                        disabled={props.isAuto}
                    />
                </div>
                <p className="text-xs text-green-400 text-center mt-4 italic">
                    {props.isAuto ? "[ Disabled in Auto Mode ]" : "[ Use to manually control ]"}
                </p>

                <div className="pt-6 border-t border-green-800 mt-6 w-full">
                    <p className="text-sm mb-2 text-center">[ DIM SWITCH ]</p>
                    <div className="flex items-center justify-center">
                        <span className="text-xs mr-2">{dim ? "1 dim" : "2 dim"}</span>
                        <div
                            onClick={toggleDim}
                            className={`w-16 h-8 flex items-center rounded-full p-1 cursor-pointer transition ${dim ? "bg-green-600" : "bg-gray-700"}`}
                        >
                            <motion.div
                                animate={{ x: dim ? 32 : 0 }}
                                transition={{ type: "spring", stiffness: 400 }}
                                className="w-6 h-6 bg-green-300 rounded-full shadow-md"
                            />
                        </div>
                    </div>
                </div>
            </motion.div>
        </main>
    )
}
