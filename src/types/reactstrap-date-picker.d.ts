declare module 'reactstrap-date-picker' {
  import type * as React from 'react';

  interface DatePickerProps {
    id?: string;
    name?: string;
    value?: string;
    onChange?: (value: string, formattedValue: string) => void;
    dateFormat?: string;
    [key: string]: any;
  }

  const DatePicker: React.FC<DatePickerProps>;
  export default DatePicker;
}
