import { resetPasswordAction } from '@/app/actions';
import { SubmitButton } from '@/components/submit-button';

export default async function ResetPassword({
  searchParams,
}: {
  searchParams: { [key: string]: string | undefined };
}) {
  const token_hash = searchParams.token_hash;
  const email = searchParams.email;

  console.log('searchParams:', searchParams);
  console.log('token_hash:', searchParams.token_hash);
  console.log('email:', searchParams.email);

  if (!token_hash) {
    return <p>Invalid or missing token/email. Please check your reset link.</p>;
  }

  return (
    <form
      className="flex flex-col w-full max-w-md p-4 gap-2 [&>input]:mb-4"
      action={resetPasswordAction}
      method="POST"
    >
      <h1 className="text-2xl font-medium">Reset password</h1>
      <p className="text-sm text-foreground/60">
        Please enter your new password below.
      </p>
      <input
        type="hidden"
        id="token_hash"
        name="token_hash"
        value={token_hash}
      />
      <input type="hidden" name="email" value={email} />
      <label htmlFor="password">New password</label>
      <input
        type="password"
        id="password"
        name="password"
        placeholder="New password"
        required
      />
      <label htmlFor="confirmPassword">Confirm password</label>
      <input
        type="password"
        id="confirmPassword"
        name="confirmPassword"
        placeholder="Confirm password"
        required
      />
      <SubmitButton>Reset password</SubmitButton>
    </form>
  );
}
