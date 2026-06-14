import { useState, useEffect } from 'react';
import { Card } from '../components/ui/Card';
import { Input } from '../components/ui/Input';
import { Toggle } from '../components/ui/Toggle';
import { ArrowRightLeft, Calendar as CalendarIcon } from 'lucide-react';
import NepaliDate from 'nepali-datetime';
import Calendar from '@sbmdkl/nepali-datepicker-reactjs';
import '@sbmdkl/nepali-datepicker-reactjs/dist/index.css';
import ReactDatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

// Helper to convert "YYYY-MM-DD" string to local Date object
const parseAdDate = (val: string) => {
  if (!val || !/^\d{4}-\d{2}-\d{2}$/.test(val)) return null;
  const [year, month, day] = val.split('-').map(Number);
  const d = new Date(year, month - 1, day);
  return isNaN(d.getTime()) ? null : d;
};

// Helper to format Date object to "YYYY-MM-DD" string
const formatAdDate = (date: Date | null) => {
  if (!date) return '';
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
};

export function DateTranslator() {
  const [isAdToBs, setIsAdToBs] = useState(true);
  const [inputValue, setInputValue] = useState(() => formatAdDate(new Date()));
  const [outputValue, setOutputValue] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    if (!inputValue) {
      setOutputValue('');
      setError('');
      return;
    }

    try {
      if (isAdToBs) {
        // AD to BS
        const adDate = new Date(`${inputValue}T12:00:00+05:45`);
        if (isNaN(adDate.getTime())) throw new Error('Invalid AD Date');
        
        const bsDate = new NepaliDate(adDate);
        setOutputValue(bsDate.format('YYYY-MM-DD'));
        setError('');
      } else {
        // BS to AD
        if (!/^\d{4}-\d{2}-\d{2}$/.test(inputValue)) {
          throw new Error('Format must be YYYY-MM-DD');
        }
        const bsDate = new NepaliDate(inputValue);
        setOutputValue(bsDate.formatEnglishDate('YYYY-MM-DD'));
        setError('');
      }
    } catch (err: any) {
      setOutputValue('');
      setError(err.message || 'Invalid date');
    }
  }, [inputValue, isAdToBs]);

  const handleToggle = (checked: boolean) => {
    setIsAdToBs(!checked);
    setInputValue(outputValue);
  };

  const handleBsDateChange = ({ bsDate }: { bsDate: string }) => {
    setInputValue(bsDate);
  };

  const handleAdDateChange = (date: Date | null) => {
    setInputValue(formatAdDate(date));
  };

  // Common styling for consistency
  const inputStyle = `w-full bg-[var(--color-surface)] border border-[var(--color-border)] rounded-xl px-4 py-3 text-[var(--color-text-primary)] placeholder-[var(--color-text-secondary)] focus-ring transition-all duration-200`;

  return (
    <div className="max-w-2xl mx-auto space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="flex items-center gap-4">
        <div className="bg-[var(--color-accent)]/10 p-3 rounded-xl">
          <CalendarIcon className="w-6 h-6 text-[var(--color-accent)]" />
        </div>
        <div>
          <h1 className="text-2xl font-bold">Date Translator</h1>
          <p className="text-[var(--color-text-secondary)]">Convert between AD and BS instantly</p>
        </div>
      </div>

      <Card>
        <div className="flex flex-col gap-8">
          <div className="flex items-center justify-between bg-[var(--color-background)] p-4 rounded-xl border border-[var(--color-border)] shadow-inner">
            <span className={`font-medium ${isAdToBs ? 'text-[var(--color-accent)]' : 'text-[var(--color-text-secondary)]'}`}>
              Gregorian (AD)
            </span>
            <Toggle checked={!isAdToBs} onChange={handleToggle} />
            <span className={`font-medium ${!isAdToBs ? 'text-[var(--color-accent)]' : 'text-[var(--color-text-secondary)]'}`}>
              Bikram Sambat (BS)
            </span>
          </div>

          <div className="grid md:grid-cols-[1fr_auto_1fr] gap-6 items-center">
            {isAdToBs ? (
              <div className="w-full flex flex-col gap-1.5">
                <label className="text-sm font-medium text-[var(--color-text-secondary)] ml-1">AD Date (Input)</label>
                <div className="w-full">
                  <ReactDatePicker
                    selected={parseAdDate(inputValue)}
                    onChange={handleAdDateChange}
                    dateFormat="yyyy-MM-dd"
                    placeholderText="YYYY-MM-DD"
                    showMonthDropdown
                    showYearDropdown
                    dropdownMode="select"
                    className={`${inputStyle} ${error ? 'border-red-500 focus:ring-red-500' : ''}`}
                    wrapperClassName="w-full"
                  />
                </div>
                {error && <span className="text-xs text-red-500 ml-1">{error}</span>}
              </div>
            ) : (
              <div className="w-full flex flex-col gap-1.5">
                <label className="text-sm font-medium text-[var(--color-text-secondary)] ml-1">BS Date (Input)</label>
                <div className="relative">
                  <Calendar 
                    key={inputValue || 'empty'}
                    defaultDate={inputValue || ''}
                    onChange={handleBsDateChange} 
                    language='en' 
                    dateFormat='YYYY-MM-DD'
                    theme='red'
                    className={`${inputStyle} ${error ? 'border-red-500 focus:ring-red-500' : ''}`}
                  />
                </div>
                {error && <span className="text-xs text-red-500 ml-1">{error}</span>}
              </div>
            )}
            
            <div className="hidden md:flex justify-center mt-6 text-[var(--color-border)]">
              <ArrowRightLeft className="w-6 h-6" />
            </div>

            {isAdToBs ? (
              <Input
                type="text"
                label="BS Date (Result)"
                value={outputValue}
                readOnly
                className="bg-[var(--color-background)] text-[var(--color-accent)] font-medium shadow-inner"
              />
            ) : (
              <div className="w-full flex flex-col gap-1.5">
                <label className="text-sm font-medium text-[var(--color-text-secondary)] ml-1">AD Date (Result)</label>
                <div className="w-full">
                  <ReactDatePicker
                    selected={parseAdDate(outputValue)}
                    onChange={() => {}}
                    dateFormat="yyyy-MM-dd"
                    readOnly
                    className={`${inputStyle} bg-[var(--color-background)] text-[var(--color-accent)] font-medium shadow-inner`}
                    wrapperClassName="w-full"
                  />
                </div>
              </div>
            )}
          </div>
        </div>
      </Card>
      {/* Overriding some default react-datepicker styles globally to fit the theme */}
      <style>{`
        .react-datepicker-wrapper {
          width: 100%;
        }
        .react-datepicker {
          font-family: inherit;
          border: 1px solid var(--color-border);
          border-radius: 0.75rem;
          box-shadow: 0 10px 15px -3px rgb(0 0 0 / 0.1);
        }
        .react-datepicker__header {
          background-color: var(--color-background);
          border-bottom: 1px solid var(--color-border);
          border-top-left-radius: 0.75rem;
          border-top-right-radius: 0.75rem;
        }
        .react-datepicker__day--selected, .react-datepicker__day--keyboard-selected {
          background-color: var(--color-accent) !important;
          color: white;
        }
        .react-datepicker__year-select, .react-datepicker__month-select {
          padding: 2px 6px;
          border-radius: 6px;
          border: 1px solid var(--color-border);
          background-color: var(--color-surface);
          color: var(--color-text-primary);
          outline: none;
          cursor: pointer;
        }
      `}</style>
    </div>
  );
}
