import React from 'react'

const ButtonFastCali = ({ text, onClick }) => {
    return (
        <div className="flex justify-center space-x-4">
            <button
                onClick={onClick}
                type="submit"
                className="w-[250px] ml-10  mt-4 h-[44px] bg-yellow-300 hover:bg-yellow-400 text-gray-900 font-bold py-2 px-4 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-300"
            >
                {text}
            </button>
        </div>
    )
}

export default ButtonFastCali
