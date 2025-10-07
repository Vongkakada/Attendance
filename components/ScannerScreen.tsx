import React, { useEffect, useRef } from 'react';

declare const Html5Qrcode: any;

interface ScannerScreenProps {
  onScanSuccess: (decodedText: string) => void;
  onScanError: (errorMessage: string) => void;
  onCancel: () => void;
}

const qrCodeRegionId = "qr-code-reader";

const ScannerScreen: React.FC<ScannerScreenProps> = ({ onScanSuccess, onScanError, onCancel }) => {
  const scannerRef = useRef<any>(null);

  useEffect(() => {
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
            // This callback is for non-fatal scan errors, we can ignore them for now
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
    
    // Cleanup function to be called on component unmount
    return () => {
      const scanner = scannerRef.current;
      if (scanner) {
        // The clear method stops scanning and clears the UI.
        // It returns a promise which should be handled.
        scanner.clear()
          .catch((error: any) => {
            // This can happen if the scanner is already cleared or not running.
            // It's generally safe to ignore, but we log it as a warning for debugging.
            console.warn("Scanner cleanup failed, probably already cleaned up.", error);
          });
        scannerRef.current = null;
      }
    };
  }, [onScanSuccess, onScanError]);

  return (
    <div className="fixed inset-0 bg-black/90 flex flex-col items-center justify-center z-50">
      <div className="relative w-[250px] h-[250px]">
        <div id={qrCodeRegionId} className="w-full h-full rounded-2xl overflow-hidden border-2 border-slate-700"></div>
        <div id="qr-code-reader-region" className="absolute inset-0">
          <div></div> {/* For bottom borders pseudo elements */}
        </div>
      </div>
      <p className="text-slate-200 mt-8 text-lg font-medium animate-pulse">Scanning...</p>
      <button
        onClick={onCancel}
        className="absolute bottom-10 bg-black/50 backdrop-blur-sm hover:bg-white/20 text-white font-bold py-3 px-8 rounded-xl transition-colors duration-300"
      >
        Cancel
      </button>
    </div>
  );
};

export default ScannerScreen;