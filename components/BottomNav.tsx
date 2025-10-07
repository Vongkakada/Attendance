import React from 'react';
import { AppView } from '../types';
import { HomeIcon } from './icons/HomeIcon';
import { ClipboardListIcon } from './icons/ClipboardListIcon';
import { CalendarDaysIcon } from './icons/CalendarDaysIcon';
import { ClockIcon } from './icons/ClockIcon';

interface BottomNavProps {
  currentView: AppView;
  setView: (view: AppView) => void;
}

const NavItem: React.FC<{
  label: string;
  icon: React.ReactNode;
  isActive: boolean;
  onClick: () => void;
}> = ({ label, icon, isActive, onClick }) => (
  <button
    onClick={onClick}
    aria-label={label}
    className={`flex flex-col items-center justify-center gap-1 w-full transition-colors duration-200 ${
      isActive ? 'text-indigo-400' : 'text-slate-500 hover:text-slate-300'
    }`}
  >
    {icon}
    <span className="text-xs font-medium">{label}</span>
  </button>
);

const BottomNav: React.FC<BottomNavProps> = ({ currentView, setView }) => {
  const navItems = [
    { view: AppView.DASHBOARD, label: 'Home', icon: <HomeIcon className="w-6 h-6" /> },
    { view: AppView.HISTORY, label: 'History', icon: <ClipboardListIcon className="w-6 h-6" /> },
    { view: AppView.LEAVE, label: 'Leave', icon: <CalendarDaysIcon className="w-6 h-6" /> },
    { view: AppView.OVERTIME, label: 'Overtime', icon: <ClockIcon className="w-6 h-6" /> },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 w-full max-w-md mx-auto h-20 bg-slate-900/80 backdrop-blur-lg border-t border-slate-800 flex items-center justify-around px-4">
      {navItems.map((item) => (
        <NavItem
          key={item.view}
          label={item.label}
          icon={item.icon}
          isActive={currentView === item.view}
          onClick={() => setView(item.view)}
        />
      ))}
    </nav>
  );
};

export default BottomNav;
