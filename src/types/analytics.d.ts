interface Window {
  gtag: (
    command: string,
    action: string,
    params?: {
      event_category?: string;
      event_label?: string;
      value?: number;
      [key: string]: string | number | undefined;
    }
  ) => void;
  hj: (command: string, action: string) => void;
  _learnq: Array<[string, string, { [key: string]: string | number }]>;
} 