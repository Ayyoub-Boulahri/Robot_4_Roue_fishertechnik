import React, { useEffect, useState } from "react";
import BoxedCaptorValue from "../components/BoxedCaptorValue";
import Wheel from "../components/Wheel";
import LineCaptorBox from "../components/LineCaptorBox";
import { convertData } from "../services/handleData";

const LiveData = (props) => {
    const [parsedData, setParsedData] = useState(null);

    useEffect(() => {
        try {
            const converted = convertData(props.data);
            setParsedData(converted);
        } catch (err) {
            console.warn("Invalid data received:", err);
            setParsedData(null);
        }
    }, [props.data]);

    return (
        <div className="min-h-screen bg-black text-green-400 p-6 font-mono relative">
            <div className="absolute inset-0 bg-black z-0 overflow-hidden">
                <div className="absolute top-0 left-0 w-full h-full opacity-10 bg-[url('/matrix.gif')] bg-repeat bg-center pointer-events-none" />
            </div>

            <header className="text-center z-10 relative">
                <h1 className="text-4xl md:text-5xl font-bold tracking-wider text-green-400 border-b border-green-600 pb-4">
                    [ LIVE SENSOR DATA ]
                </h1>
                <p className="text-sm mt-1">Real-time Speed & Distance Captor Feedback</p>
            </header>

            <div className="flex justify-center items-center mt-10 z-10 relative">
                <div className="relative w-[400px] h-[400px]">
                    <div className="absolute inset-0 flex justify-center items-center">
                        <div className="w-50 h-60 bg-green-900/30 border-4 border-green-500 rounded-xl relative shadow-2xl" />
                    </div>

                    <div className="flex justify-center gap-3">
                        <BoxedCaptorValue label={"FRONT L"} value={parsedData?.ultraSon?.[1] ?? "-"} />
                        <BoxedCaptorValue label={"FRONT R"} value={parsedData?.ultraSon?.[0] ?? "-"} />
                    </div>

                    <div className="absolute top-1/2 left-1 -translate-y-1/2">
                        <BoxedCaptorValue label={"CENTER L"} value={parsedData?.ultraSon?.[3] ?? "-"} />
                    </div>

                    <div className="absolute top-1/2 right-1 -translate-y-1/2">
                        <BoxedCaptorValue label={"CENTER R"} value={parsedData?.ultraSon?.[2] ?? "-"} />
                    </div>

                    <div className="absolute top-30 right-16 -translate-y-1/2">
                        <Wheel speed={parsedData?.motor_speeds?.[1] ?? 0} />
                    </div>

                    <div className="absolute bottom-10 right-16 -translate-y-1/2">
                        <Wheel speed={parsedData?.motor_speeds?.[0] ?? 0} />
                    </div>

                    <div className="absolute top-30 left-16 -translate-y-1/2">
                        <Wheel speed={parsedData?.motor_speeds?.[2] ?? 0} />
                    </div>

                    <div className="absolute bottom-10 left-16 -translate-y-1/2">
                        <Wheel speed={parsedData?.motor_speeds?.[3] ?? 0} />
                    </div>

                    <div className="absolute inset-0 flex justify-center items-start top-24">
                        <LineCaptorBox left={parsedData?.line_sensor?.[1] ?? 0} right={parsedData?.line_sensor?.[0] ?? 0} orientation={"h"} />
                    </div>

                    <div className="absolute inset-0 flex justify-center items-center">
                        <LineCaptorBox left={parsedData?.line_sensor?.[3] ?? 0} right={parsedData?.line_sensor?.[2] ?? 0} orientation={"v"} />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default LiveData;
