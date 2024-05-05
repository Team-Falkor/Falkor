import React, { useEffect } from 'react';

const ConsoleLogger: React.FC = () => {
  useEffect(() => {
    const originalConsoleWarn: typeof console.warn = console.warn;
    const originalConsoleError: typeof console.error = console.error;
    const originalConsoleInfo: typeof console.info = console.info;

    console.warn = function (message: any, ...optionalParams: any[]): void {
      // Call the original console.warn method
      originalConsoleWarn.apply(console, [message, ...optionalParams]);

      // You can log the warning message to the console or display it on your app page
      console.log('Warning:', message);
    };

    console.error = function (message: any, ...optionalParams: any[]): void {
      // Call the original console.error method
      originalConsoleError.apply(console, [message, ...optionalParams]);

      // You can log the error message to the console or display it on your app page
      console.log('Error:', message);
    };

    console.info = function (message: any, ...optionalParams: any[]): void {
      // Call the original console.info method
      originalConsoleInfo.apply(console, [message, ...optionalParams]);

      // You can log the info message to the console or display it on your app page
      console.log('Info:', message);
    };

    // Clean up: Restore the original console methods when the component unmounts
    return () => {
      console.warn = originalConsoleWarn;
      console.error = originalConsoleError;
      console.info = originalConsoleInfo;
    };
  }, []);

  return null; // This component doesn't render anything
};

export default ConsoleLogger;
