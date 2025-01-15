'use client';

import { ButtonHTMLAttributes, ReactNode } from 'react';

interface SubmitButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  pendingText?: string;
  pending?: boolean;
}

export function SubmitButton({
  children,
  pendingText = 'Submitting...',
  pending = false,
  ...props
}: SubmitButtonProps) {
  return (
    <button type="submit" disabled={pending} {...props}>
      {pending ? pendingText : children}
    </button>
  );
}
