import React from 'react';
import { Employee, DailyAttendance } from '../types';
import { mockAttendanceSummary } from '../data/mock';

interface DashboardScreenProps {
  employee: Employee;
  todaysAttendance: DailyAttendance | null;
  onScanClick: () => void;
}

const DashboardScreen: React.FC<DashboardScreenProps> = ({ employee, todaysAttendance, onScanClick }) => {
  const hasCheckedIn = !!todaysAttendance?.checkIn;
  const hasCheckedOut = !!todaysAttendance?.checkOut;

  const getScanButton = () => {
    if (!hasCheckedIn) {
      return (
        <button
          onClick={onScanClick}
          className="w-full bg-indigo-600 hover:bg-indigo-500 text-white font-bold py-4 px-6 rounded-xl text-lg transition-colors duration-300"
        >
          Scan to Check In
        </button>
      );
    }
    if (!hasCheckedOut) {
      return (
        <button
          onClick={onScanClick}
          className="w-full bg-sky-600 hover:bg-sky-500 text-white font-bold py-4 px-6 rounded-xl text-lg transition-colors duration-300"
        >
          Scan to Check Out
        </button>
      );
    }
    return (
      <button
        disabled
        className="w-full bg-slate-700 text-slate-400 font-bold py-4 px-6 rounded-xl text-lg cursor-not-allowed"
      >
        Attendance Complete
      </button>
    );
  };
  
  const getStatusContent = () => {
    if (hasCheckedIn && hasCheckedOut) {
        return (
             <div>
                <p className="font-semibold text-slate-100 mb-2">Attendance Complete!</p>
                <div className="text-sm space-y-1 text-slate-400">
                    <p>Check In: <span className="font-medium text-slate-300">{todaysAttendance.checkIn.time}</span></p>
                    <p>Check Out: <span className="font-medium text-slate-300">{todaysAttendance.checkOut.time}</span></p>
                </div>
            </div>
        )
    }
    if (hasCheckedIn) {
        return (
            <div>
                <p className="font-semibold text-slate-100">Checked-in at {todaysAttendance.checkIn.time}</p>
                <p className="text-slate-400 text-sm">Have a productive day!</p>
            </div>
        )
    }
    return (
        <div>
            <p className="font-semibold text-slate-100">You haven't checked in yet.</p>
            <p className="text-slate-400 text-sm">Tap the scan button to mark your attendance.</p>
        </div>
    )
  }

  const getStatusIcon = () => {
    if (hasCheckedOut) {
        return <p className="text-green-400 text-2xl font-bold">✓</p>
    }
    if (hasCheckedIn) {
        return <p className="text-sky-400 text-lg font-bold">IN</p>
    }
    return <p className="text-yellow-400 text-2xl font-bold">!</p>
  }
  
  const getStatusIconBg = () => {
    if (hasCheckedOut) {
        return 'bg-green-500/20'
    }
    if (hasCheckedIn) {
        return 'bg-sky-500/20'
    }
    return 'bg-yellow-500/20'
  }

  return (
    <div className="py-8">
      <header className="flex items-center gap-4 mb-8">
        <img src={employee.avatarUrl} alt={employee.name} className="w-14 h-14 rounded-full border-2 border-slate-700" />
        <div>
          <p className="text-slate-400">Welcome back,</p>
          <h1 className="text-2xl font-bold text-slate-100">{employee.name}</h1>
        </div>
      </header>

      <section className="mb-8">
        <h2 className="text-lg font-semibold text-slate-300 mb-4">Today's Status</h2>
        <div className="bg-slate-900 rounded-2xl p-6">
           <div className="flex items-center gap-4">
              <div className={`w-12 h-12 flex items-center justify-center rounded-full ${getStatusIconBg()}`}>
                {getStatusIcon()}
              </div>
              {getStatusContent()}
            </div>
        </div>
      </section>

      <section className="mb-8">
        <h2 className="text-lg font-semibold text-slate-300 mb-4">Summary</h2>
        <div className="grid grid-cols-2 gap-4">
          <div className="bg-slate-900 rounded-2xl p-5">
            <p className="text-slate-400 text-sm">Total Present</p>
            <p className="text-3xl font-bold text-slate-100">{mockAttendanceSummary.totalPresent}</p>
            <p className="text-slate-500 text-xs">This Month</p>
          </div>
          <div className="bg-slate-900 rounded-2xl p-5">
            <p className="text-slate-400 text-sm">Total Leave</p>
            <p className="text-3xl font-bold text-slate-100">{mockAttendanceSummary.totalLeave}</p>
             <p className="text-slate-500 text-xs">This Month</p>
          </div>
        </div>
      </section>
      
      {getScanButton()}

    </div>
  );
};

export default DashboardScreen;