import React from 'react';

export const QrCodeIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 64 64"
    stroke="currentColor"
    {...props}
  >
    <path d="M16 8H8V16" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M48 8H56V16" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M16 56H8V48" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M48 56H56V48" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);
