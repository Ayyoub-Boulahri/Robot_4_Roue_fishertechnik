import React from 'react'

export default function LineCaptorBox(props) {
    return (
        <div className={`flex ${props.orientation == "h" ? "flex-row" : "flex-col-reverse"}`}>
            <div className="bg-blue-800 min-w-12 text-center text-blue-200 px-2 py-1 rounded border border-blue-600">
                {props.left}
            </div>
            <div className="bg-blue-800 min-w-12 text-center text-blue-200 px-2 py-1 rounded border border-blue-600">
                {props.right}
            </div>
        </div>
    )
}
