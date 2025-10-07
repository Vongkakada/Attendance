import React from 'react';

export const CalendarDaysIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    fill="none" 
    viewBox="0 0 24 24" 
    strokeWidth={1.5} 
    stroke="currentColor" 
    {...props}>
    <path 
        strokeLinecap="round" 
        strokeLinejoin="round" 
        d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 0 1 2.25-2.25h13.5A2.25 2.25 0 0 1 21 7.5v11.25m-18 0A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75m-18 0h18M-7.5 12h1.5" 
    />
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 12.75h.007v.008H12v-.008Z" />
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 16.5h.007v.008H12v-.008Z" />
    <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 12.75h.008v.008H16.5v-.008Z" />
    <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 16.5h.008v.008H16.5v-.008Z" />
    <path strokeLinecap="round" strokeLinejoin="round" d="M7.5 12.75h.007v.008H7.5v-.008Z" />
    <path strokeLinecap="round" strokeLinejoin="round" d="M7.5 16.5h.007v.008H7.5v-.008Z" />
</svg>
);
