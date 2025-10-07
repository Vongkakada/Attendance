import React, { useState } from 'react';
import { mockAttendanceHistory } from '../data/mock';
import { AttendanceHistoryEntry } from '../types';

const HistoryCard: React.FC<{ entry: AttendanceHistoryEntry }> = ({ entry }) => (
  <div className="bg-slate-900 rounded-lg p-4 flex items-center justify-between">
    <div>
      <p className="font-semibold text-slate-100">{entry.date}</p>
      <p className="text-sm text-slate-400">
        {entry.checkIn} - {entry.checkOut ?? 'N/A'}
      </p>
    </div>
    <div className="text-right">
       <span className={`px-2 py-1 text-xs font-semibold rounded-full ${
            entry.status === 'On Time' ? 'bg-green-500/20 text-green-400' : 'bg-yellow-500/20 text-yellow-400'
        }`}>
            {entry.status}
       </span>
       <p className="text-sm text-slate-500 mt-1">{entry.hours}</p>
    </div>
  </div>
);

const HistoryScreen: React.FC = () => {
    const [activeFilter, setActiveFilter] = useState('Month');
    const filters = ['Day', 'Week', 'Month', 'Year'];
  return (
    <div className="py-8">
      <h1 className="text-3xl font-bold text-slate-100 mb-2">Attendance History</h1>
      <p className="text-slate-400 mb-8">Review your past attendance records.</p>
      
      <div className="flex items-center bg-slate-900 rounded-lg p-1 mb-6">
        {filters.map(filter => (
             <button key={filter} onClick={() => setActiveFilter(filter)} className={`w-full text-center text-sm font-semibold py-2 rounded-md transition-colors ${
                activeFilter === filter ? 'bg-indigo-600 text-white' : 'text-slate-400 hover:bg-slate-800'
             }`}>
                {filter}
             </button>
        ))}
      </div>

      <div className="space-y-3">
        {mockAttendanceHistory.map((entry, index) => (
            <HistoryCard key={index} entry={entry} />
        ))}
      </div>
    </div>
  );
};

export default HistoryScreen;
