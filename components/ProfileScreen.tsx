import React from 'react';
import { Employee } from '../types';
import { ChevronLeftIcon } from './icons/ChevronLeftIcon';
import { CogIcon } from './icons/CogIcon';
import { QuestionMarkCircleIcon } from './icons/QuestionMarkCircleIcon';
import { ArrowLeftOnRectangleIcon } from './icons/ArrowLeftOnRectangleIcon';

interface ProfileScreenProps {
  employee: Employee;
  onClose: () => void;
}

const MenuItem: React.FC<{ icon: React.ReactNode; label: string; onClick?: () => void; }> = ({ icon, label, onClick }) => (
    <button onClick={onClick} className="flex items-center w-full p-4 bg-slate-900 hover:bg-slate-800 rounded-lg transition-colors">
        {icon}
        <span className="ml-4 text-slate-200 font-medium">{label}</span>
    </button>
);

const ProfileScreen: React.FC<ProfileScreenProps> = ({ employee, onClose }) => {
  return (
    <div className="fixed inset-0 bg-slate-950 z-50 flex flex-col animate-fade-in">
      <header className="w-full max-w-md mx-auto px-4 pt-6 pb-4 flex items-center">
        <button onClick={onClose} className="p-2 rounded-full hover:bg-slate-800 transition-colors">
            <ChevronLeftIcon className="w-7 h-7 text-slate-400" />
        </button>
        <h1 className="text-xl font-bold text-slate-100 mx-auto">Profile</h1>
        <div className="w-9 h-9"></div> {/* Spacer */}
      </header>

      <main className="flex-grow w-full max-w-md mx-auto px-4">
        <div className="flex flex-col items-center text-center my-8">
            <img 
                src={employee.avatarUrl} 
                alt={employee.name} 
                className="w-24 h-24 rounded-full border-4 border-slate-700 mb-4"
            />
            <h2 className="text-2xl font-bold text-white">{employee.name}</h2>
            <p className="text-slate-400 font-mono text-sm">{employee.id}</p>
        </div>

        <div className="bg-slate-900 rounded-xl p-6 mb-8 text-sm">
            <div className="flex justify-between py-3 border-b border-slate-800">
                <span className="text-slate-400">Department</span>
                <span className="font-medium text-slate-200">{employee.department}</span>
            </div>
             <div className="flex justify-between py-3">
                <span className="text-slate-400">Position</span>
                <span className="font-medium text-slate-200">{employee.position}</span>
            </div>
        </div>

        <div className="space-y-3">
            <MenuItem icon={<CogIcon className="w-6 h-6 text-slate-400" />} label="Settings" />
            <MenuItem icon={<QuestionMarkCircleIcon className="w-6 h-6 text-slate-400" />} label="Help Center" />
            <MenuItem icon={<ArrowLeftOnRectangleIcon className="w-6 h-6 text-red-500" />} label="Logout" />
        </div>
      </main>
    </div>
  );
};

export default ProfileScreen;
