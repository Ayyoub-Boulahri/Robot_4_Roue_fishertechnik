import React, { useEffect, useState } from "react";
import useMqtt from "../services/MqttConnection";
import JoystickControl from "../components/JoystickControl";
import ButtonsControl from "../components/ButtonsControl";

const Control = (props) => {
    const [isAuto, setIsAuto] = useState(false);

    const control_topic = "control";
    const move_topic = "control/move";

    useEffect(() => {
        const handleKeyDown = (e) => e.code === "Space" && props.sendMessage(control_topic, "drift");
        const handleKeyUp = (e) => e.code === "Space" && props.sendMessage(control_topic, "stop");
        window.addEventListener("keydown", handleKeyDown);
        window.addEventListener("keyup", handleKeyUp);
        return () => {
            window.removeEventListener("keydown", handleKeyDown);
            window.removeEventListener("keyup", handleKeyUp);
        };
    }, []);




    const handleCommand = (cmd) => {
        props.connected && props.sendMessage(control_topic, cmd)
    };

    return (
        <div className={`relative min-h-screen flex text-green-400 overflow-hidden font-mono`}>
            <div className="absolute inset-0 bg-black z-0 overflow-hidden">
                <div className="absolute top-0 left-0 w-full h-full opacity-10 bg-[url('/matrix.gif')] bg-repeat bg-center pointer-events-none" />
            </div>

            <ButtonsControl data={props.data}control_topic={control_topic} sendMessage={props.sendMessage} setIsAuto={setIsAuto} connected={props.connected} handleCommand={handleCommand} isAuto={isAuto} />
            <JoystickControl isAuto={isAuto} sendMessage={props.sendMessage} control_topic={control_topic}/>

        </div>
    );
};

export default Control;