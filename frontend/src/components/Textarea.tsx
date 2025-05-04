import React, { useState } from 'react';

interface TextAreaProps {
  value?: string;
  defaultValue?: string;
  onChange?: (value: string) => void;
  placeholder?: string;
  disabled?: boolean;
  label?: string;
  maxLength?: number;
  rows?: number;
  className?: string;
  required?: boolean;
}

export const TextArea: React.FC<TextAreaProps> = ({
  value: controlledValue,
  defaultValue = '',
  onChange,
  placeholder = 'Type your message here...',
  disabled = false,
  label,
  maxLength,
  rows = 4,
  className = '',
  required = false,
}) => {
  const [internalValue, setInternalValue] = useState(defaultValue);
  
  const isControlled = controlledValue !== undefined;
  const currentValue = isControlled ? controlledValue : internalValue;
  
  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const newValue = e.target.value;
    
    if (!isControlled) {
      setInternalValue(newValue);
    }
    
    if (onChange) {
      onChange(newValue);
    }
  };

  return (
    <div className={`flex flex-col ${className}`}>
      {label && (
        <label className="block text-sm font-medium text-gray-700 mb-1">
          {label}{required && <span className="text-red-500 ml-1">*</span>}
        </label>
      )}
      
      <textarea
        value={currentValue}
        onChange={handleChange}
        placeholder={placeholder}
        disabled={disabled}
        maxLength={maxLength}
        rows={rows}
        required={required}
        className="focus:outline-none focus:ring-1 focus:ring-gray-300 resize-none"
        style={{
          width: '541px',
          height: '101px',
          border: '1px solid #FFF',
          background: 'rgba(174, 164, 191, 0.00)',
          padding: '12px 20px',
          borderRadius: '25px',
          color: '#333',
        }}
      />
      
      {maxLength && (
        <div className="flex justify-end mt-1 text-xs text-gray-500">
          {currentValue.length}/{maxLength}
        </div>
      )}
    </div>
  );
};