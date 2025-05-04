import React, { useState } from 'react';

interface SwitchProps {
  isOn?: boolean;
  onChange?: (isOn: boolean) => void;
  disabled?: boolean;
  label?: string;
  className?: string;
}

export const Switch: React.FC<SwitchProps> = ({
  isOn = false,
  onChange,
  disabled = false,
  label,
  className = '',
}) => {
  const [checked, setChecked] = useState(isOn);
  
  const handleToggle = () => {
    if (disabled) return;
    
    const newState = !checked;
    setChecked(newState);
    
    if (onChange) {
      onChange(newState);
    }
  };

  // Custom colors based on specs
  const purpleColor = '#AEA4BF';
  const grayColor = '#D9D9D9';
  const highlightColor = '#CCB1B1';

  return (
    <div className={`flex items-center ${className}`}>
      {label && (
        <span className="mr-3 text-gray-700 font-medium">{label}</span>
      )}
      <div 
        className={`
          relative
          w-44
          h-16
          rounded-full
          transition-all
          duration-300
          focus-within:ring-2
          focus-within:ring-opacity-75
          ${disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}
          focus-within:ring-opacity-75
          focus-within:ring-[${highlightColor}]
        `}
        style={{
          width: '180px',
          height: '65px',
          backgroundColor: checked ? grayColor : purpleColor,
          boxShadow: `0 0 0 2px ${highlightColor}`
        }}
        onClick={handleToggle}
      >
        <div
          className={`
            absolute
            rounded-full
            transition-all
            duration-300
            transform
            top-1
            shadow-md
          `}
          style={{
            backgroundColor: checked ? purpleColor : grayColor,
            width: '55px',
            height: '55px',
            left: checked ? 'calc(180px - 55px - 5px)' : '5px',
          }}
        />
        <input
          type="checkbox"
          className="sr-only"
          checked={checked}
          onChange={handleToggle}
          disabled={disabled}
          aria-label={label || "Toggle switch"}
        />
      </div>
    </div>
  );
};