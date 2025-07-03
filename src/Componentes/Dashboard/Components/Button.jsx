import React from 'react';

const Button = ({ text, onClick }) => {
  return (
    <button 
      type='button' 
      className={`py-4 px-6 bg-gradient-to-t to-top from-slate-50 to-amber-300 text-black bg-clip-tex font-poppins font-medium text-[18px] text-primary outline-none rounded-[20px] mr-4`}
      onClick={onClick}
    >
      {text}
    </button>
  );
}

export default Button;
