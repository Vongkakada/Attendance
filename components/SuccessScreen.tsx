import React from 'react';
import { AttendanceLog, ScanType } from '../types';
import { CheckIcon } from './icons/CheckIcon';

interface SuccessScreenProps {
  attendanceLog: AttendanceLog;
  scanType: ScanType;
  onDone: () => void;
}

const SuccessScreen: React.FC<SuccessScreenProps> = ({ attendanceLog, scanType, onDone }) => {
  const { employee, date, time } = attendanceLog;

  return (
    <div className="fixed inset-0 bg-green-600 flex flex-col items-center justify-between p-8 z-50">
      <div className="flex-grow flex flex-col items-center justify-center text-center w-full">
        <div className="w-24 h-24 flex items-center justify-center bg-white/20 rounded-full mb-6">
          <CheckIcon className="w-16 h-16 text-white" />
        </div>
        <h2 className="text-3xl font-bold text-white mb-2">{scanType}</h2>
        <p className="text-green-100 mb-8">Successfully recorded.</p>


        <div className="w-full max-w-sm bg-slate-900/50 backdrop-blur-sm rounded-2xl p-6 text-center flex flex-col items-center gap-4">
          <img
            src={employee.avatarUrl}
            alt={employee.name}
            className="w-28 h-28 rounded-full border-4 border-slate-700 object-cover -mt-20 mb-4"
          />
          <div>
              <p className="text-2xl font-bold text-white">{employee.name}</p>
              <p className="text-slate-400 font-mono text-sm">{employee.id}</p>
          </div>
          <div className="w-full border-t border-slate-700 my-2"></div>
          <div className="flex justify-between w-full text-base">
              <span className="text-slate-400">Date:</span>
              <span className="font-medium text-slate-200">{date}</span>
          </div>
          <div className="flex justify-between w-full text-base">
              <span className="text-slate-400">Time:</span>
              <span className="font-medium text-slate-200">{time}</span>
          </div>
        </div>
      </div>

      <button
        onClick={onDone}
        className="w-full max-w-sm bg-white text-green-600 font-bold py-4 px-6 rounded-xl text-lg transition-colors duration-300 hover:bg-white/80"
      >
        Done
      </button>
    </div>
  );
};

export default SuccessScreen;