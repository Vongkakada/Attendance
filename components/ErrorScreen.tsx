import React from 'react';
import { XCircleIcon } from './icons/XCircleIcon';

interface ErrorScreenProps {
  message: string;
  onTryAgain: () => void;
}

const ErrorScreen: React.FC<ErrorScreenProps> = ({ message, onTryAgain }) => {
  return (
    <div className="fixed inset-0 bg-red-600 flex flex-col items-center justify-between p-8 z-50 text-center">
       <div className="flex-grow flex flex-col items-center justify-center">
        <div className="w-24 h-24 flex items-center justify-center bg-white/20 rounded-full mb-6">
            <XCircleIcon className="w-16 h-16 text-white" />
        </div>
        <h2 className="text-3xl font-bold text-white mb-2">Scan Failed</h2>
        <p className="text-red-100 mb-8 max-w-xs">{message}</p>
      </div>
      
      <button
        onClick={onTryAgain}
        className="w-full max-w-sm bg-white text-red-600 font-bold py-4 px-6 rounded-xl text-lg transition-colors duration-300 hover:bg-white/80"
      >
        OK
      </button>
    </div>
  );
};

export default ErrorScreen;
