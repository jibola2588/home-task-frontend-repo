import React, { FC } from 'react';

interface UploadIconProps {
  color: string;
}

const UploadIcon: FC<UploadIconProps> = ({ color }) => {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M7.50016 14.167V9.16699L5.8335 10.8337" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M7.5 9.16699L9.16667 10.8337" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M18.3332 8.33366V12.5003C18.3332 16.667 16.6665 18.3337 12.4998 18.3337H7.49984C3.33317 18.3337 1.6665 16.667 1.6665 12.5003V7.50033C1.6665 3.33366 3.33317 1.66699 7.49984 1.66699H11.6665" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M18.3332 8.33366H14.9998C12.4998 8.33366 11.6665 7.50033 11.6665 5.00033V1.66699L18.3332 8.33366Z" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export default UploadIcon;
