'use client';

import React, { useState } from 'react';
import { Eye, EyeOff, Lock } from 'lucide-react';

interface PasswordInputProps {
  id: string;
  name: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
  className?: string;
  autoComplete?: string;
  showIcon?: boolean;
  iconClassName?: string;
  error?: string;
  label?: string;
  required?: boolean;
}

const PasswordInput: React.FC<PasswordInputProps> = ({
  id,
  name,
  value,
  onChange,
  placeholder = "••••••••",
  className = "",
  autoComplete,
  showIcon = true,
  iconClassName = "h-5 w-5",
  error,
  label,
  required = false
}) => {
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const baseInputClasses = `
    ${showIcon ? 'pl-10' : 'pl-3'} pr-10 block w-full border border-gray-300 rounded-md px-3 py-2 
    focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent
    ${error ? 'border-red-300 focus:ring-red-500' : ''}
  `;

  return (
    <div>
      {label && (
        <label htmlFor={id} className="block text-sm font-medium text-gray-700">
          {label} {required && <span className="text-red-500">*</span>}
        </label>
      )}
      <div className={`${label ? 'mt-1' : ''} relative`}>
        {showIcon && (
          <Lock className={`absolute left-3 top-3 ${iconClassName} text-gray-400`} />
        )}
        <input
          type={showPassword ? 'text' : 'password'}
          id={id}
          name={name}
          value={value}
          onChange={onChange}
          autoComplete={autoComplete}
          className={`${baseInputClasses} ${className}`}
          placeholder={placeholder}
        />
        <button
          type="button"
          onClick={togglePasswordVisibility}
          className="absolute right-3 top-3 text-gray-400 hover:text-gray-600 focus:outline-none focus:text-gray-600 transition-colors duration-200"
          aria-label={showPassword ? 'Hide password' : 'Show password'}
        >
          {showPassword ? (
            <EyeOff className={iconClassName} />
          ) : (
            <Eye className={iconClassName} />
          )}
        </button>
      </div>
      {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
    </div>
  );
};

export default PasswordInput;