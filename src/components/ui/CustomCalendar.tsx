'use client';

import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, Calendar as CalendarIcon, X } from 'lucide-react';

interface CalendarProps {
  isOpen: boolean;
  onClose: () => void;
  onDateSelect: (date: string) => void;
  selectedDate?: string;
  minDate?: string;
  maxDate?: string;
}

const CustomCalendar: React.FC<CalendarProps> = ({
  isOpen,
  onClose,
  onDateSelect,
  selectedDate,
  minDate,
  maxDate
}) => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [animationClass, setAnimationClass] = useState('');

  useEffect(() => {
    if (isOpen) {
      setAnimationClass('animate-slideIn');
      document.body.style.overflow = 'hidden';
    } else {
      setAnimationClass('animate-slideOut');
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  const monthNames = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  const dayNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

  const getDaysInMonth = (date: Date) => {
    return new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
  };

  const getFirstDayOfMonth = (date: Date) => {
    return new Date(date.getFullYear(), date.getMonth(), 1).getDay();
  };

  const formatDate = (year: number, month: number, day: number) => {
    return `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
  };

  const isDateDisabled = (year: number, month: number, day: number) => {
    const dateStr = formatDate(year, month, day);
    
    if (minDate && dateStr < minDate) return true;
    if (maxDate && dateStr > maxDate) return true;
    
    return false;
  };

  const isSelectedDate = (year: number, month: number, day: number) => {
    if (!selectedDate) return false;
    return selectedDate === formatDate(year, month, day);
  };

  const isToday = (year: number, month: number, day: number) => {
    const today = new Date();
    return today.getFullYear() === year && 
           today.getMonth() === month && 
           today.getDate() === day;
  };

  const handleDateClick = (year: number, month: number, day: number) => {
    if (isDateDisabled(year, month, day)) return;
    
    const dateStr = formatDate(year, month, day);
    onDateSelect(dateStr);
    onClose();
  };

  const navigateMonth = (direction: 'prev' | 'next') => {
    setCurrentDate(prev => {
      const newDate = new Date(prev);
      if (direction === 'prev') {
        newDate.setMonth(prev.getMonth() - 1);
      } else {
        newDate.setMonth(prev.getMonth() + 1);
      }
      return newDate;
    });
  };

  const navigateYear = (direction: 'prev' | 'next') => {
    setCurrentDate(prev => {
      const newDate = new Date(prev);
      if (direction === 'prev') {
        newDate.setFullYear(prev.getFullYear() - 1);
      } else {
        newDate.setFullYear(prev.getFullYear() + 1);
      }
      return newDate;
    });
  };

  const renderCalendarDays = () => {
    const daysInMonth = getDaysInMonth(currentDate);
    const firstDay = getFirstDayOfMonth(currentDate);
    const days = [];

    // Previous month's trailing days
    const prevMonth = new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 0);
    const daysInPrevMonth = prevMonth.getDate();
    
    for (let i = firstDay - 1; i >= 0; i--) {
      const day = daysInPrevMonth - i;
      days.push(
        <button
          key={`prev-${day}`}
          className="h-12 w-12 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-all duration-200 text-sm"
          onClick={() => {
            const prevDate = new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, day);
            handleDateClick(prevDate.getFullYear(), prevDate.getMonth(), day);
          }}
        >
          {day}
        </button>
      );
    }

    // Current month days
    for (let day = 1; day <= daysInMonth; day++) {
      const year = currentDate.getFullYear();
      const month = currentDate.getMonth();
      const disabled = isDateDisabled(year, month, day);
      const selected = isSelectedDate(year, month, day);
      const today = isToday(year, month, day);

      days.push(
        <button
          key={`current-${day}`}
          disabled={disabled}
          onClick={() => handleDateClick(year, month, day)}
          className={`
            h-12 w-12 rounded-lg text-sm font-medium transition-all duration-200 relative
            ${disabled 
              ? 'text-gray-300 cursor-not-allowed' 
              : 'text-gray-900 hover:bg-blue-50 hover:text-blue-600 cursor-pointer'
            }
            ${selected 
              ? 'bg-blue-600 text-white hover:bg-blue-700 shadow-md transform scale-105' 
              : ''
            }
            ${today && !selected 
              ? 'bg-blue-100 text-blue-600 font-bold' 
              : ''
            }
          `}
        >
          {day}
          {today && !selected && (
            <span className="absolute bottom-1 left-1/2 transform -translate-x-1/2 w-1 h-1 bg-blue-600 rounded-full"></span>
          )}
        </button>
      );
    }

    // Next month's leading days
    const totalCells = Math.ceil((firstDay + daysInMonth) / 7) * 7;
    const remainingCells = totalCells - (firstDay + daysInMonth);
    
    for (let day = 1; day <= remainingCells; day++) {
      days.push(
        <button
          key={`next-${day}`}
          className="h-12 w-12 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-all duration-200 text-sm"
          onClick={() => {
            const nextDate = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, day);
            handleDateClick(nextDate.getFullYear(), nextDate.getMonth(), day);
          }}
        >
          {day}
        </button>
      );
    }

    return days;
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Backdrop with opacity animation */}
      <div 
        className="absolute inset-0 bg-black transition-opacity duration-300 ease-in-out"
        style={{ opacity: isOpen ? 0.5 : 0 }}
        onClick={onClose}
      />
      
      {/* Calendar Container */}
      <div className={`
        relative bg-white rounded-2xl shadow-2xl max-w-lg w-full mx-4 p-6
        transform transition-all duration-300 ease-in-out
        ${animationClass}
      `}>
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-3">
            <CalendarIcon className="h-6 w-6 text-blue-600" />
            <h2 className="text-xl font-bold text-gray-900">Select Date</h2>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors duration-200"
          >
            <X className="h-5 w-5 text-gray-500" />
          </button>
        </div>

        {/* Month/Year Navigation - Side by Side */}
        <div className="mb-6">
          <div className="flex items-center justify-center space-x-6">
            {/* Month Navigation */}
            <div className="flex items-center">
              <span className="text-sm font-medium text-gray-600 mr-3">Month:</span>
              <div className="flex items-center bg-blue-50 rounded-lg px-2 py-1">
                <button
                  onClick={() => navigateMonth('prev')}
                  className="p-2 hover:bg-blue-100 rounded-lg transition-colors duration-200 group"
                  title="Previous Month"
                >
                  <ChevronLeft className="h-5 w-5 text-blue-600 group-hover:text-blue-700" />
                </button>
                <div className="mx-2 w-[120px] text-center">
                  <span className="text-lg font-bold text-blue-700 block truncate">
                    {monthNames[currentDate.getMonth()]}
                  </span>
                </div>
                <button
                  onClick={() => navigateMonth('next')}
                  className="p-2 hover:bg-blue-100 rounded-lg transition-colors duration-200 group"
                  title="Next Month"
                >
                  <ChevronRight className="h-5 w-5 text-blue-600 group-hover:text-blue-700" />
                </button>
              </div>
            </div>
            
            {/* Year Navigation */}
            <div className="flex items-center">
              <span className="text-sm font-medium text-gray-600 mr-3">Year:</span>
              <div className="flex items-center bg-gray-50 rounded-lg px-2 py-1">
                <button
                  onClick={() => navigateYear('prev')}
                  className="p-2 hover:bg-gray-100 rounded-lg transition-colors duration-200 group"
                  title="Previous Year"
                >
                  <ChevronLeft className="h-4 w-4 text-gray-600 group-hover:text-gray-700" />
                </button>
                <div className="mx-2 w-[90px] text-center">
                  <span className="text-lg font-bold text-gray-700 block">
                    {currentDate.getFullYear()}
                  </span>
                </div>
                <button
                  onClick={() => navigateYear('next')}
                  className="p-2 hover:bg-gray-100 rounded-lg transition-colors duration-200 group"
                  title="Next Year"
                >
                  <ChevronRight className="h-4 w-4 text-gray-600 group-hover:text-gray-700" />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Day Headers */}
        <div className="grid grid-cols-7 gap-2 mb-4">
          {dayNames.map(day => (
            <div key={day} className="h-10 flex items-center justify-center">
              <span className="text-sm font-medium text-gray-500">{day}</span>
            </div>
          ))}
        </div>

        {/* Calendar Grid */}
        <div className="grid grid-cols-7 gap-2">
          {renderCalendarDays()}
        </div>

        {/* Quick Actions */}
        <div className="flex items-center justify-between mt-6 pt-4 border-t border-gray-200">
          <button
            onClick={() => {
              const today = new Date();
              const todayStr = formatDate(today.getFullYear(), today.getMonth(), today.getDate());
              onDateSelect(todayStr);
              onClose();
            }}
            className="px-4 py-2 text-sm font-medium text-blue-600 hover:bg-blue-50 rounded-lg transition-colors duration-200"
          >
            Today
          </button>
          <button
            onClick={() => {
              onDateSelect('');
              onClose();
            }}
            className="px-4 py-2 text-sm font-medium text-gray-600 hover:bg-gray-100 rounded-lg transition-colors duration-200"
          >
            Clear
          </button>
        </div>
      </div>

      <style jsx>{`
        @keyframes slideIn {
          from {
            opacity: 0;
            transform: scale(0.95) translateY(-10px);
          }
          to {
            opacity: 1;
            transform: scale(1) translateY(0);
          }
        }
        
        @keyframes slideOut {
          from {
            opacity: 1;
            transform: scale(1) translateY(0);
          }
          to {
            opacity: 0;
            transform: scale(0.95) translateY(-10px);
          }
        }
        
        .animate-slideIn {
          animation: slideIn 0.3s ease-out forwards;
        }
        
        .animate-slideOut {
          animation: slideOut 0.3s ease-in forwards;
        }
      `}</style>
    </div>
  );
};

export default CustomCalendar;