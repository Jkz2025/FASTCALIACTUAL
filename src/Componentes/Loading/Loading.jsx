import React from 'react'

const Loading = (
    {
        size = 12,
        color = "blue",
    }
) => {
    return (
        <div className='flex justify-center items-center h-full min-h-[16rem]'>

            <div className={`animate-spin rounded-full border-b-2`}
                style={{
                    height: `${size * 0.25}rem`,
                    width: `${size * 0.25}rem`,
                    borderColor: color === "blue" ? "#3b82f6" : color
                }} ></div>
        </div>
    )
}

export default Loading