import React from 'react';

interface CustomButtonProps {
  onClick: () => void;
  title: string;
  className?: string;
}

const CustomButton: React.FC<CustomButtonProps> = ({ onClick, title, className }) => {
  return (
    <button
      onClick={onClick}
      className={`bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded ${className}`}
    >
      {title}
    </button>
  );
};

export default CustomButton;

