import React from 'react';
import { QrCodeIcon } from './icons/QrCodeIcon';
import { ArrowRightIcon } from './icons/ArrowRightIcon';

interface WelcomeScreenProps {
  onScanClick: () => void;
}

const WelcomeScreen: React.FC<WelcomeScreenProps> = ({ onScanClick }) => {
  return (
    <div className="flex flex-col items-center justify-center text-center min-h-[90vh]">
      <div className="flex-grow flex flex-col items-center justify-center">
        <div className="p-6 bg-indigo-600/20 rounded-full mb-8">
            <QrCodeIcon className="w-16 h-16 text-indigo-400" />
        </div>
        <h1 className="text-4xl font-bold text-slate-100 mb-4">Scan QR Code</h1>
        <p className="text-slate-400 mb-12 max-w-xs">
          Please align the QR code within the frame to mark your attendance
        </p>
        <button
          onClick={onScanClick}
          aria-label="Scan QR Code"
          className="w-20 h-20 flex items-center justify-center bg-indigo-600 hover:bg-indigo-500 text-white font-bold rounded-full text-lg transition-all duration-300 transform hover:scale-110 focus:outline-none focus:ring-4 focus:ring-indigo-500/50"
        >
          <ArrowRightIcon className="w-8 h-8" />
        </button>
      </div>
      <footer className="text-sm text-slate-500">
        Powered by Gemini
      </footer>
    </div>
  );
};

export default WelcomeScreen;
