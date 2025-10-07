import React, { useState, useCallback } from 'react';
import { AppView, ScannerState, AttendanceLog, DailyAttendance, ScanType } from './types';
import { mockEmployee } from './data/mock';

import DashboardScreen from './components/DashboardScreen';
import HistoryScreen from './components/HistoryScreen';
import LeaveScreen from './components/LeaveScreen';
import OvertimeScreen from './components/OvertimeScreen';
import BottomNav from './components/BottomNav';
import ScannerScreen from './components/ScannerScreen';
import SuccessScreen from './components/SuccessScreen';
import ErrorScreen from './components/ErrorScreen';
import Header from './components/Header';
import ProfileScreen from './components/ProfileScreen';

const App: React.FC = () => {
  const [currentView, setCurrentView] = useState<AppView>(AppView.DASHBOARD);
  const [scannerState, setScannerState] = useState<ScannerState>(ScannerState.IDLE);
  const [lastAttendanceLog, setLastAttendanceLog] = useState<AttendanceLog | null>(null);
  const [lastScanType, setLastScanType] = useState<ScanType | null>(null);
  const [errorMessage, setErrorMessage] = useState<string>('');
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  
  const [todaysAttendance, setTodaysAttendance] = useState<DailyAttendance | null>(null);

  const handleScanClick = useCallback(() => {
    setScannerState(ScannerState.SCANNING);
  }, []);

  const handleScanSuccess = useCallback((decodedText: string) => {
    setScannerState(ScannerState.PROCESSING);

    // Simulate network/validation delay
    setTimeout(() => {
      try {
        const data = JSON.parse(decodedText);
        if (data.employeeId && data.name && mockEmployee.id === data.employeeId) {
          const now = new Date();
          const newLog: AttendanceLog = {
            employee: {
              id: data.employeeId,
              name: data.name,
              avatarUrl: `https://i.pravatar.cc/150?u=${data.employeeId}`,
              position: mockEmployee.position,
              department: mockEmployee.department
            },
            date: now.toLocaleDateString('en-US', { day: 'numeric', month: 'long', year: 'numeric' }),
            time: now.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: true })
          };
          
          setLastAttendanceLog(newLog);

          if (!todaysAttendance?.checkIn) {
              setTodaysAttendance({ checkIn: newLog, checkOut: null });
              setLastScanType('Check In');
          } else if (!todaysAttendance?.checkOut) {
              setTodaysAttendance({ ...todaysAttendance, checkOut: newLog });
              setLastScanType('Check Out');
          }
          
          setScannerState(ScannerState.SUCCESS);
        } else {
          throw new Error("Invalid employee QR code.");
        }
      } catch (error) {
        handleScanError('Please use a valid QR code to mark your attendance.');
      }
    }, 1500); // 1.5 second delay
  }, [todaysAttendance]);

  const handleScanError = useCallback((message: string) => {
    setErrorMessage(message);
    setScannerState(ScannerState.ERROR);
  }, []);

  const resetScanner = useCallback(() => {
    // Keep last log for success screen, but reset for new scan
    if (scannerState !== ScannerState.SUCCESS) {
        setLastAttendanceLog(null);
        setLastScanType(null);
    }
    setErrorMessage('');
    setScannerState(ScannerState.IDLE);
  }, [scannerState]);
  
  const handleProfileOpen = () => setIsProfileOpen(true);
  const handleProfileClose = () => setIsProfileOpen(false);

  const renderView = () => {
    switch (currentView) {
      case AppView.HISTORY:
        return <HistoryScreen />;
      case AppView.LEAVE:
        return <LeaveScreen />;
      case AppView.OVERTIME:
        return <OvertimeScreen />;
      case AppView.DASHBOARD:
      default:
        return <DashboardScreen employee={mockEmployee} todaysAttendance={todaysAttendance} onScanClick={handleScanClick} />;
    }
  };
  
  const renderScannerModal = () => {
    switch(scannerState) {
      case ScannerState.SCANNING:
      case ScannerState.PROCESSING:
        return <ScannerScreen state={scannerState} onScanSuccess={handleScanSuccess} onScanError={handleScanError} onCancel={resetScanner} />;
      case ScannerState.SUCCESS:
        return lastAttendanceLog && lastScanType ? <SuccessScreen attendanceLog={lastAttendanceLog} scanType={lastScanType} onDone={resetScanner} /> : null;
      case ScannerState.ERROR:
        return <ErrorScreen message={errorMessage} onTryAgain={resetScanner} />;
      case ScannerState.IDLE:
      default:
        return null;
    }
  }

  return (
    <div className="min-h-screen bg-transparent text-white flex flex-col">
      <Header onProfileClick={handleProfileOpen} />
      <main className="flex-grow w-full max-w-md mx-auto px-4 pb-24">
        {renderView()}
      </main>
      <BottomNav currentView={currentView} setView={setCurrentView} />
      {renderScannerModal()}
      {isProfileOpen && <ProfileScreen employee={mockEmployee} onClose={handleProfileClose} />}
    </div>
  );
};

export default App;