'use client';

import React, { useState } from 'react';
import { Calendar } from 'lucide-react';
import CustomCalendar from './CustomCalendar';

interface DateInputProps {
  id: string;
  name: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
  className?: string;
  label?: string;
  error?: string;
  required?: boolean;
  minDate?: string;
  maxDate?: string;
  disabled?: boolean;
}

const DateInput: React.FC<DateInputProps> = ({
  id,
  name,
  value,
  onChange,
  placeholder = "Select date",
  className = "",
  label,
  error,
  required = false,
  minDate,
  maxDate,
  disabled = false
}) => {
  const [isCalendarOpen, setIsCalendarOpen] = useState(false);

  const handleDateSelect = (selectedDate: string) => {
    // Create a synthetic event to maintain compatibility with existing form handlers
    const syntheticEvent = {
      target: {
        name,
        value: selectedDate
      }
    } as React.ChangeEvent<HTMLInputElement>;
    
    onChange(syntheticEvent);
    setIsCalendarOpen(false);
  };

  const formatDisplayDate = (dateStr: string) => {
    if (!dateStr) return '';
    
    const date = new Date(dateStr);
    const options: Intl.DateTimeFormatOptions = {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    };
    
    return date.toLocaleDateString('en-US', options);
  };

  const baseInputClasses = `
    pl-10 pr-4 py-2 block w-full border border-gray-300 rounded-md 
    focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent
    transition-all duration-200 cursor-pointer
    ${error ? 'border-red-300 focus:ring-red-500' : ''}
    ${disabled ? 'bg-gray-100 cursor-not-allowed' : 'bg-white hover:border-gray-400'}
  `;

  return (
    <div className="relative">
      {label && (
        <label htmlFor={id} className="block text-sm font-medium text-gray-700 mb-1">
          {label} {required && <span className="text-red-500">*</span>}
        </label>
      )}
      
      <div className="relative">
        <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
        <input
          type="text"
          id={id}
          name={name}
          value={value ? formatDisplayDate(value) : ''}
          placeholder={placeholder}
          className={`${baseInputClasses} ${className}`}
          onClick={() => !disabled && setIsCalendarOpen(true)}
          onFocus={() => !disabled && setIsCalendarOpen(true)}
          readOnly
          disabled={disabled}
        />
        
        {/* Hidden input for form submission */}
        <input
          type="hidden"
          name={name}
          value={value}
        />
      </div>
      
      {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
      
      <CustomCalendar
        isOpen={isCalendarOpen}
        onClose={() => setIsCalendarOpen(false)}
        onDateSelect={handleDateSelect}
        selectedDate={value}
        minDate={minDate}
        maxDate={maxDate}
      />
    </div>
  );
};

export default DateInput;