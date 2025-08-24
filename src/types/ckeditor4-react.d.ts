declare module 'ckeditor4-react' {
  import * as React from 'react';
  
  interface CKEditorProps {
    data?: string;
    config?: any;
    onChange?: (event: any) => void;
    onReady?: (editor: any) => void;
    [key: string]: any;
  }
  
  export default class CKEditor extends React.Component<CKEditorProps> {}
}
