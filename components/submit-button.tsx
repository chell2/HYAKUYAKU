'use client';

import { useFormStatus } from 'react-dom';
import { ButtonHTMLAttributes, ReactNode } from 'react';

interface SubmitButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  pendingText?: string;
}

export function SubmitButton({
  children,
  pendingText = 'Submitting...',
  ...props
}: SubmitButtonProps) {
  const { pending } = useFormStatus();

  return (
    <button type="submit" aria-disabled={pending} {...props}>
      {pending ? pendingText : children}
    </button>
  );
}
