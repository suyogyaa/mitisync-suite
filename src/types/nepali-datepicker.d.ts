declare module '@sbmdkl/nepali-datepicker-reactjs' {
  import React from 'react';

  export interface NepaliDatePickerProps {
    className?: string;
    defaultDate?: string;
    dateFormat?: string;
    language?: 'en' | 'ne';
    minDate?: string;
    maxDate?: string;
    onChange?: (dates: { bsDate: string; adDate: string }) => void;
    style?: React.CSSProperties;
    theme?: 'red' | 'blue' | 'green' | 'dark' | 'deepdark' | 'default';
    hideDefaultValue?: boolean;
    placeholder?: string;
  }

  const Calendar: React.FC<NepaliDatePickerProps>;
  export default Calendar;
}
