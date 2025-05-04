import React, { useState } from 'react';

interface SliderProps {
  min?: number;
  max?: number;
  step?: number;
  defaultValue?: number;
  value?: number;
  onChange?: (value: number) => void;
  disabled?: boolean;
  label?: string;
  className?: string;
}

export const Slider: React.FC<SliderProps> = ({
  min = 0,
  max = 100,
  step = 1,
  defaultValue,
  value: controlledValue,
  onChange,
  disabled = false,
  label,
  className = '',
}) => {
  const [internalValue, setInternalValue] = useState(defaultValue || min);
  
  const isControlled = controlledValue !== undefined;
  const currentValue = isControlled ? controlledValue : internalValue;
  
  const percentage = ((currentValue - min) / (max - min)) * 100;
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = Number(e.target.value);
    
    if (!isControlled) {
      setInternalValue(newValue);
    }
    
    if (onChange) {
      onChange(newValue);
    }
  };

  const handleSliderClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (disabled) return;
    
    const sliderRect = e.currentTarget.getBoundingClientRect();
    const clickPosition = e.clientX - sliderRect.left;
    const sliderWidth = sliderRect.width;
    
    const newValue = min + (clickPosition / sliderWidth) * (max - min);
    const steppedValue = Math.round(newValue / step) * step;
    const boundedValue = Math.max(min, Math.min(max, steppedValue));
    
    if (!isControlled) {
      setInternalValue(boundedValue);
    }
    

    if (onChange) {
      onChange(boundedValue);
    }
  };

  const handleMouseDown = () => {
    document.body.style.cursor = 'grabbing';
  };
  
  const handleMouseUp = () => {
    document.body.style.cursor = 'default';
  };

  React.useEffect(() => {
    document.addEventListener('mouseup', handleMouseUp);
    return () => {
      document.removeEventListener('mouseup', handleMouseUp);
    };
  }, []);

  return (
    <div className={`${className}`}>
      {label && (
        <label className="block text-sm font-medium text-gray-700 mb-1">
          {label}
        </label>
      )}
      
      <div 
        style={{
          display: 'inline-flex',
          height: '49px',
          padding: '11px 11px 10px 7px',
          alignItems: 'center',
          border: '1px solid #FFF',
          background: 'rgba(255, 255, 255, 0.00)',
          borderRadius: '4px',
          width: '100%'
        }}
      >
        <div className="relative w-full" onClick={handleSliderClick}>
          <div className="w-full h-2 bg-gray-200 rounded-full"
               style={{ cursor: disabled ? 'not-allowed' : 'pointer' }}>
            <div 
              className="h-2 rounded-full" 
              style={{ 
                width: `${percentage}%`,
                backgroundColor: '#AEA4BF'
              }}
            />
          </div>
          
          <input
            type="range"
            min={min}
            max={max}
            step={step}
            value={currentValue}
            onChange={handleChange}
            disabled={disabled}
            className="absolute top-0 w-full h-6 opacity-0 cursor-pointer z-10"
            style={{ 
              WebkitAppearance: 'none',
              appearance: 'none',
              pointerEvents: disabled ? 'none' : 'auto',
              marginTop: '-10px'
            }}
            onMouseDown={handleMouseDown}
            onTouchStart={handleMouseDown}
          />
          <div 
            className={`absolute top-1/2 w-6 h-6 rounded-full transform -translate-y-1/2 -translate-x-1/2 ${
              disabled ? 'opacity-50' : 'shadow-lg hover:shadow-xl'
            }`}
            style={{ 
              left: `${percentage}%`,
              cursor: disabled ? 'not-allowed' : 'grab',
              backgroundColor: '#AEA4BF',
              border: '2px solid #AEA4BF',
              transition: 'box-shadow 0.2s ease'
            }}
          />
        </div>
      </div>
    </div>
  );
};