import React from 'react';

interface ButtonProps {
  label: string;
  onClick: () => void;
  disabled?: boolean;
  size?: 'sm' | 'md' | 'lg';
  variant?: 'primary' | 'secondary' | 'outline';
  className?: string;
}

// Export the Button component directly
export const Button: React.FC<ButtonProps> = ({
  label,
  onClick,
  disabled = false,
  size = 'md',
  variant = 'primary',
  className = '',
}) => {
  // Size classes
  const sizeClasses = {
    sm: 'py-1 px-3 text-sm',
    md: 'py-2 px-4 text-base',
    lg: 'py-3 px-6 text-lg'
  };
  
  // Variant classes
  const variantClasses = {
    primary: 'bg-white text-gray-800 border border-gray-300 hover:bg-gray-100',
    secondary: 'bg-white text-blue-600 border border-blue-300 hover:bg-blue-50',
    outline: 'bg-white text-gray-700 border border-gray-400 hover:bg-gray-50'
  };
  
  return (
    <button
      className={`
        rounded-full
        font-medium
        shadow-sm
        transition-colors
        duration-200
        focus:outline-none 
        focus:ring-2 
        focus:ring-gray-300
        disabled:opacity-50 
        disabled:cursor-not-allowed
        ${sizeClasses[size]}
        ${variantClasses[variant]}
        ${className}
      `}
      onClick={onClick}
      disabled={disabled}
      type="button"
    >
      {label}
    </button>
  );
};

// Example usage
export default function ButtonDemo() {
  const handleClick = () => {
    alert('Button clicked!');
  };

  return (
    <div className="flex flex-col space-y-6 p-6">

      
      <div className="space-y-2">
        <div className="flex flex-wrap items-center">
          <Button 
            label=" Button" 
            onClick={handleClick} 
            size="sm"
          />
          
        </div>
      </div>
    </div>
  );
}