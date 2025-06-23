import React from 'react'

export default function Wheel(props) {
    return (
        <div className="w-16 h-16 rounded-full bg-red-800 flex justify-center items-center text-red-200 px-2 py-1 border border-red-600">
            {Math.round(props.speed)}
        </div>
    )
}
