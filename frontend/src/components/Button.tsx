import React from 'react';

interface ButtonProps {
  // label is now optional if children are provided
  label?: string;
  onClick: () => void;
  disabled?: boolean;
  size?: 'sm' | 'md' | 'lg';
  // Kept existing variants, but modified 'primary' to match input style
  variant?: 'primary' | 'secondary' | 'outline';
  className?: string;
  children?: React.ReactNode; // Allow children for more complex content
  type?: "button" | "submit" | "reset"; // Pass button type
}

// Export the Button component directly
export const Button: React.FC<ButtonProps> = ({
  label,
  onClick,
  disabled = false,
  size = 'md',
  variant = 'primary',
  className = '',
  children, // Destructure children prop
  type = "button", // Default button type
}) => {
  // Size classes
  // Adjusted 'md' padding slightly for a closer match to input's 'p-2' (py-2 px-2)
  const sizeClasses = {
    sm: 'py-1 px-3 text-sm',
    md: 'py-2 px-3 text-base', // Input's p-2 is like py-2 px-2, px-3 feels slightly better for a button
    lg: 'py-3 px-6 text-lg'
  };

  // Variant classes
  const variantClasses = {
    // Modified 'primary' to match Input's background and text color, and border/hover
    primary: 'bg-[#E3E4DB] text-[#0A0E15] border border-transparent hover:opacity-90',
    // Keep other variants as they were, or adjust if needed
    secondary: 'bg-white text-blue-600 border border-blue-300 hover:bg-blue-50',
    outline: 'bg-white text-gray-700 border border-gray-400 hover:bg-gray-50'
  };

  return (
    <button
      className={`
        bg-[#6D2E46] hover:opacity-90 text-white font-bold py-2 px-4 rounded transition-opacity
      `}
      onClick={onClick}
      disabled={disabled}
      type={type}          
    >
      {/* Render children if provided, otherwise render the label */}
      {children || label}
    </button>
  );
};