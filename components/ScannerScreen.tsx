import React, { useEffect, useRef } from 'react';
import { ScannerState } from '../types';
import { SpinnerIcon } from './icons/SpinnerIcon';

declare const Html5Qrcode: any;

interface ScannerScreenProps {
  state: ScannerState;
  onScanSuccess: (decodedText: string) => void;
  onScanError: (errorMessage: string) => void;
  onCancel: () => void;
}

const qrCodeRegionId = "qr-code-reader";

const ScannerScreen: React.FC<ScannerScreenProps> = ({ state, onScanSuccess, onScanError, onCancel }) => {
  const scannerRef = useRef<any>(null);
  const isProcessing = state === ScannerState.PROCESSING;

  useEffect(() => {
    // Only initialize the scanner if it's not already running
    if (state === ScannerState.SCANNING && !scannerRef.current) {
        const html5QrCode = new Html5Qrcode(qrCodeRegionId);
        scannerRef.current = html5QrCode;
        const config = { fps: 10, qrbox: { width: 250, height: 250 }, aspectRatio: 1.0 };

        const startScanner = async () => {
          try {
            await html5QrCode.start(
              { facingMode: "environment" },
              config,
              onScanSuccess,
              (errorMessage: string) => {
                // Ignore non-fatal scan errors
              }
            );
          } catch (err: unknown) {
              let message = "An unknown error occurred";
              if (err instanceof Error) {
                  message = err.message;
              }
              if (message.includes('NotAllowedError')) {
                  onScanError(`Camera access was denied. Please allow camera permissions in your browser settings.`);
              } else if (message.includes('Requested device not found')) {
                  onScanError(`No camera found. Please ensure your device has a camera and it's enabled.`);
              } else {
                  onScanError(`Failed to start QR scanner. Please try again.`);
              }
          }
        };
        startScanner();
    }
    
    // Cleanup function
    return () => {
      if (scannerRef.current) {
        scannerRef.current.clear()
          .catch((error: any) => {
            console.warn("Scanner cleanup failed, probably already cleaned up.", error);
          });
        scannerRef.current = null;
      }
    };
  }, [state, onScanSuccess, onScanError]);

  return (
    <div className="fixed inset-0 bg-black/90 flex flex-col items-center justify-center z-50">
      <div className="relative w-[250px] h-[250px]">
        <div id={qrCodeRegionId} className={`w-full h-full rounded-2xl overflow-hidden border-2 border-slate-700 ${isProcessing ? 'filter blur-sm' : ''}`}></div>
        <div id="qr-code-reader-region" className="absolute inset-0">
          <div></div>
        </div>
        {isProcessing && (
          <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/50 rounded-2xl">
            <SpinnerIcon className="w-12 h-12 text-white animate-spin" />
            <p className="text-slate-200 mt-4 font-medium">Processing...</p>
          </div>
        )}
      </div>
      <p className={`text-slate-200 mt-8 text-lg font-medium ${!isProcessing ? 'animate-pulse' : ''}`}>
        {isProcessing ? 'Validating QR Code' : 'Scanning...'}
      </p>
      <button
        onClick={onCancel}
        disabled={isProcessing}
        className="absolute bottom-10 bg-black/50 backdrop-blur-sm hover:bg-white/20 text-white font-bold py-3 px-8 rounded-xl transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        Cancel
      </button>
    </div>
  );
};

export default ScannerScreen;