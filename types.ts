import React from 'react';

export interface StarButtonProps {
  onClick: () => void;
  icon: React.ReactNode;
  label?: string;
  className?: string;
  isActive?: boolean;
}

export interface EnvelopeProps {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  children: React.ReactNode;
}