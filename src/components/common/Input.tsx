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
}

const Input: React.FC<InputProps> = ({
  isVisible = true,
  styleClass = '',
  onChange,
  name,
  label = '',
  placeholder = '',
  type = 'text',
  disabled = false,
  value,
  errors,
  border = 'default',
  isRequired = false,
}) => {
  if (!isVisible) return null;

  const hasValue = value !== '' && value !== undefined && value !== null;

  const baseClass = `
    w-full h-14 px-4 pt-6 pb-2 text-base transition-all
    border ${errors ? 'border-red-500' : 'border-gray-300'}
    ${border === 'bottom' ? 'border-b rounded-none' : border === 'none' ? 'border-none' : 'rounded-lg'}
    focus:outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-100
    ${disabled ? 'opacity-50 cursor-not-allowed bg-gray-100' : ''}
    ${styleClass}
  `;

  const labelClass = `
    absolute left-4 top-4 text-gray-600 pointer-events-none transition-all duration-200
    ${hasValue || placeholder ? 'top-2 text-xs' : 'top-4 text-base'}
    ${errors ? 'text-red-500' : ''}
    ${isRequired ? "after:content-['*'] after:text-red-500 after:ml-1" : ''}
  `;

  return (
    <div className="relative w-full">
      <input
        id={name}
        name={name}
        type={type}
        value={value ?? ''}
        onChange={onChange}
        disabled={disabled}
        placeholder={placeholder || ' '}  
        className={baseClass}
      />
      {label && (
        <label htmlFor={name} className={labelClass}>
          {label}
        </label>
      )}
      {placeholder && !hasValue && (
        <span className="absolute left-4 top-4 text-gray-500 pointer-events-none">
          {placeholder}
        </span>
      )}
      {errors && (
        <p className="absolute -bottom-6 left-0 text-xs text-red-500">
          {errors}
        </p>
      )}
    </div>
  );
};

export default Input;