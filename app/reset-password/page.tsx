import { resetPasswordAction } from '@/app/actions';
import { FormMessage, Message } from '@/components/form-message';
import { SubmitButton } from '@/components/submit-button';

export default async function ResetPassword(props: {
  searchParams: Promise<Message>;
}) {
  const searchParams = await props.searchParams;

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);

    const result = await resetPasswordAction(formData);

    if (result?.type === 'error') {
      alert(result.message);
    } else if (result?.type === 'success') {
      alert(result.message);
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
      <SubmitButton>Reset password</SubmitButton>
      <FormMessage message={searchParams} />
    </form>
  );
}
