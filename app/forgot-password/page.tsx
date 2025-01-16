import { forgotPasswordAction } from '@/app/actions';
import { FormMessage, Message } from '@/components/FormMessage';
import { SubmitButton } from '@/components/SubmitButton';

export default async function ForgotPassword(props: {
  searchParams: Promise<Message>;
}) {
  const searchParams = await props.searchParams;
  return (
    <div className="bg-base-200 flex justify-center items-center min-h-screen">
      <div className="max-w-md w-full">
        <div className="card bg-base-100 w-full shadow-2xl">
          <form className="card-body">
            <div className="card-title">パスワードの再設定</div>
            <p>
              登録しているメールアドレスを入力してください。
              <br />
              パスワード再設定用のURLを送信します。
            </p>
            <div className="form-control">
              <label className="label">
                <span className="label-text">メールアドレス</span>
              </label>
              <input
                id="email"
                name="email"
                type="email"
                placeholder="you@example.com"
                className="input input-bordered"
                required
              />
              <label className="label">
                <a href="/login" className="label-text-alt link link-hover">
                  ログインはこちら
                </a>
              </label>
            </div>
            <div className="form-control mt-2">
              <SubmitButton formAction={forgotPasswordAction}>
                メールを送信
              </SubmitButton>
              <FormMessage message={searchParams} />
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
