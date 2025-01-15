import { useState } from 'react';
import { resetPasswordAction } from '@/app/actions';
import { FormMessage, Message } from '@/components/form-message';
import { SubmitButton } from '@/components/submit-button';

export default async function ResetPassword(props: {
  searchParams: Promise<Message>;
}) {
  const [pending, setPending] = useState(false);
  const searchParams = await props.searchParams;

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);

    try {
      setPending(true);
      await resetPasswordAction(formData);
    } catch (error) {
      console.error(error);
    } finally {
      setPending(false);
    }
  };

  return (
    <form
      className="flex flex-col w-full max-w-md p-4 gap-2 [&>input]:mb-4"
      onSubmit={handleSubmit}
    >
      <h1 className="text-2xl font-medium">Reset password</h1>
      <p className="text-sm text-foreground/60">
        Please enter your new password below.
      </p>
      <label htmlFor="password">New password</label>
      <input
        type="password"
        name="password"
        placeholder="New password"
        required
      />
      <label htmlFor="confirmPassword">Confirm password</label>
      <input
        type="password"
        name="confirmPassword"
        placeholder="Confirm password"
        required
      />
      <SubmitButton pending={pending}>Reset password</SubmitButton>
      <FormMessage message={searchParams} />
    </form>
  );
}
