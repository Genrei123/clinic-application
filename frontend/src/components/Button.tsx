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
  children, // Destructure children prop
  type = "button", // Default button type
}) => {
  return (
    <button
      className={`
        bg-primary hover:opacity-90 text-white font-bold py-2 px-4 rounded transition-opacity
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