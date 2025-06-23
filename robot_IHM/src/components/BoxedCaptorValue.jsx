import React from 'react'

export default function BoxedCaptorValue(props) {
    return (
        <div className="w-fit">
            <div className="text-xs mb-1">{props.label}</div>
            <div className="bg-green-800 text-green-200 px-2 py-1 rounded border border-green-600">
                {props.value}
            </div>
        </div>
    )
}
