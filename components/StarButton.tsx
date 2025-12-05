import React from 'react';
import { StarButtonProps } from '../types';

const StarButton: React.FC<StarButtonProps> = ({ onClick, icon, label, className = '', isActive = false }) => {
  return (
    <button
      onClick={onClick}
      className={`
        relative flex items-center justify-center w-14 h-14 rounded-2xl 
        transition-all duration-300 ease-out hover:-translate-y-1 hover:shadow-lg active:scale-95 active:translate-y-0
        ${isActive 
          ? 'bg-yellow-400 text-white shadow-[0_4px_0_#d97706]' 
          : 'bg-white text-yellow-500 border-2 border-yellow-200 shadow-[0_4px_0_#fde68a] hover:border-yellow-300'}
        ${className}
      `}
      title={label}
    >
      <div className="relative z-10">
        {icon}
      </div>
    </button>
  );
};

export default StarButton;