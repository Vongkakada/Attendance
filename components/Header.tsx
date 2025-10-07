import React from 'react';
import { UserIcon } from './icons/UserIcon';

interface HeaderProps {
  onProfileClick: () => void;
}

const Header: React.FC<HeaderProps> = ({ onProfileClick }) => {
  return (
    <header className="w-full max-w-md mx-auto px-4 pt-6 pb-4">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-extrabold text-slate-100 tracking-tight">NUCK-KC</h1>
        <button 
          onClick={onProfileClick}
          aria-label="User profile or login"
          className="p-2 rounded-full hover:bg-slate-800 transition-colors"
        >
          <UserIcon className="w-7 h-7 text-slate-400" />
        </button>
      </div>
    </header>
  );
};

export default Header;
