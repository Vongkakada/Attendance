import React from 'react';

interface LoginScreenProps {
  onLogin: () => void;
}

const LoginScreen: React.FC<LoginScreenProps> = ({ onLogin }) => {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onLogin();
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-transparent text-white p-4">
      <div className="w-full max-w-md">
        <header className="text-center mb-8">
          <h1 className="text-4xl font-extrabold text-slate-100 tracking-tight">NUCK-KC</h1>
          <p className="text-slate-400 mt-2">Employee Attendance Portal</p>
        </header>

        <form 
          onSubmit={handleSubmit}
          className="bg-slate-900/50 backdrop-blur-sm rounded-2xl p-8 space-y-6"
        >
          <InputField label="First Name" id="first-name" type="text" />
          <InputField label="Last Name" id="last-name" type="text" />
          <InputField label="Email" id="email" type="email" />
          <InputField label="Password" id="password" type="password" />

          <button
            type="submit"
            className="w-full bg-indigo-600 hover:bg-indigo-500 text-white font-bold py-3 px-6 rounded-xl text-lg transition-colors duration-300 focus:outline-none focus:ring-4 focus:ring-indigo-500/50"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

// Helper component for input fields to reduce repetition
const InputField: React.FC<{ label: string; id: string; type: string; }> = ({ label, id, type }) => (
    <div>
        <label htmlFor={id} className="block text-sm font-medium text-slate-300 mb-2">
            {label}
        </label>
        <input
            type={type}
            id={id}
            name={id}
            required
            className="w-full bg-slate-800/50 border border-slate-700 text-slate-200 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-colors"
        />
    </div>
);

export default LoginScreen;
