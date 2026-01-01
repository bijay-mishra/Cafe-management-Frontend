import { useState } from 'react';

interface InputProps {
  isVisible?: boolean;
  styleClass?: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  name: string;
  label?: string;
  placeholder?: string;
  type?: string;
  disabled?: boolean;
  value: string | number;
  errors?: string;
  border?: 'bottom' | 'none' | 'default';
  isRequired?: boolean;
  max?: number | string;
  min?: number | string;
}

const Input: React.FC<InputProps> = ({
  isVisible = true,
  styleClass = '',
  onChange,
  name,
  label = '',
  type = 'text',
  disabled = false,
  value,
  errors,
  border = 'default',
  isRequired = false,
  max,
  min,
}) => {
  const [focused, setFocused] = useState(false);

  if (!isVisible) return null;

  const stringValue = value?.toString() ?? '';
  const hasValue = stringValue.length > 0;
  const shouldFloat = hasValue || focused;
  const containerClass = `
    relative w-full
  `;

  const inputWrapperClass = `
    relative w-full h-14 bg-white
    border ${errors ? 'border-red-500' : 'border-gray-300'}
    ${border === 'bottom' ? 'border-b-2 rounded-none' : 'rounded-lg'}
    transition-all duration-200
    ${focused ? 'border-blue-600 ring-2 ring-blue-100' : ''}
    ${disabled ? 'opacity-50 cursor-not-allowed' : ''}
    ${styleClass}
  `;

  const inputClass = `
    w-full h-full px-4 pt-6 pb-2 bg-transparent text-base outline-none
    ${disabled ? 'cursor-not-allowed' : ''}
  `;

  const labelClass = `
    absolute left-4 px-1 pointer-events-none transition-all duration-200
    ${shouldFloat
      ? 'top-2 text-xs -translate-y-3 bg-white text-blue-600'
      : 'top-1/2 -translate-y-1/2 text-base text-gray-600'
    }
    ${errors ? '!text-red-500' : ''}
    ${isRequired ? "after:content-['*'] after:text-red-500 after:ml-0.5" : ''}
  `;

  return (
    <div className={containerClass}>
      <div className={inputWrapperClass}>
        <input
          id={name}
          name={name}
          type={type}
          value={stringValue}
          onChange={onChange}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          disabled={disabled}
          placeholder=" "  
          className={inputClass}
          max={max}
          min={min}
        />

        {label && (
          <label htmlFor={name} className={labelClass}>
            {label}
          </label>
        )}
      </div>

      {errors && (
        <p className="mt-1 text-xs text-red-500">{errors}</p>
      )}
    </div>
  );
};

export default Input;