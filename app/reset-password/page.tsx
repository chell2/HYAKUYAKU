import { Message } from '@/components/FormMessage';
import ResetPasswordForm from './reset-password-form';

export default async function ResetPasswordPage() {
  return (
    <div className="bg-base-200 flex justify-center items-center min-h-screen">
      <div className="max-w-md w-full">
        <ResetPasswordForm searchParams={Promise.resolve({} as Message)} />
      </div>
    </div>
  );
}
