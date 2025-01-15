import { resetPasswordAction } from '@/app/actions';
import { FormMessage } from '@/components/form-message';
import { SubmitButton } from '@/components/submit-button';

export default async function ResetPassword({
  searchParams,
}: {
  searchParams: { [key: string]: string | undefined };
}) {
  const token_hash = searchParams.token_hash;
    console.log('searchParams:', searchParams);
    console.log('token_hash:', token_hash);

  const message = searchParams.message
    ? { message: searchParams.message }
    : undefined;

  if (!token_hash) {
    return <p>Invalid or missing token. Please check your reset link.</p>;
  }

  return (
    <form
      className="flex flex-col w-full max-w-md p-4 gap-2 [&>input]:mb-4"
      action={resetPasswordAction}
    >
      <h1 className="text-2xl font-medium">Reset password</h1>
      <p className="text-sm text-foreground/60">
        Please enter your new password below.
      </p>
      <input type="hidden" name="access_token" value={token_hash} />
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
      {message && <FormMessage message={message} />}
    </form>
  );
}
