import React from 'react';
import { CalendarDaysIcon } from './icons/CalendarDaysIcon';

const LeaveScreen: React.FC = () => {
  return (
    <div className="py-8 flex flex-col items-center justify-center text-center min-h-[80vh]">
        <CalendarDaysIcon className="w-16 h-16 text-slate-600 mb-4" />
        <h1 className="text-3xl font-bold text-slate-100 mb-2">Leave Requests</h1>
        <p className="text-slate-400">This feature is coming soon.</p>
    </div>
  );
};

export default LeaveScreen;
