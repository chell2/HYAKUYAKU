'use client';

import { useFormStatus } from 'react-dom';
import { ButtonHTMLAttributes, ReactNode } from 'react';

interface SubmitButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  pendingText?: string;
}

export function SubmitButton({
  children,
  pendingText = '送信中...',
  ...props
}: SubmitButtonProps) {
  const { pending } = useFormStatus();

  return (
    <button
      className="btn btn-secondary mb-2"
      type="submit"
      aria-disabled={pending}
      {...props}
    >
      {pending ? pendingText : children}
    </button>
  );
}
