declare module 'reactstrap-date-picker' {
  import * as React from 'react';
  
  interface DatePickerProps {
    id?: string;
    name?: string;
    value?: string;
    onChange?: (value: string, formattedValue: string) => void;
    dateFormat?: string;
    [key: string]: any;
  }
  
  export default class DatePicker extends React.Component<DatePickerProps> {}
}
