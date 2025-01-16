import { resetPasswordAction } from './actions';
import { FormMessage, Message } from '@/components/FormMessage';
import { SubmitButton } from '@/components/SubmitButton';

export default async function ResetPassword(props: {
  searchParams: Promise<Message>;
}) {
  const searchParams = await props.searchParams;
  return (
    <div className="bg-base-200 flex justify-center items-center min-h-screen">
      <div className="max-w-md w-full">
        <div className="card bg-base-100 w-full shadow-2xl">
          <form className="card-body">
            <div className="card-title">パスワードの再設定</div>
            <p>新しいパスワードを2回入力し、設定してください。</p>
            <div className="form-control">
              <label className="label">
                <span className="label-text">新しいパスワード</span>
              </label>
              <input
                id="password"
                name="password"
                type="password"
                placeholder="例）NewPass012"
                className="input input-bordered"
                required
              />
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text">新しいパスワード（確認）</span>
              </label>
              <input
                id="password"
                name="confirmPassword"
                type="password"
                placeholder="例）NewPass012"
                className="input input-bordered"
                required
              />
            </div>
            <div className="form-control mt-4">
              <SubmitButton formAction={resetPasswordAction}>
                再設定
              </SubmitButton>
              <FormMessage message={searchParams} />
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
