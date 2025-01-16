import { login, signup } from './actions';
import { FormMessage, Message } from '@/components/FormMessage';

export default async function LoginPage(props: {
  searchParams: Promise<Message>;
}) {
  const searchParams = await props.searchParams;
  return (
    <div className="bg-base-200 flex justify-center items-center min-h-screen">
      <div className="max-w-md w-full">
        <div className="card bg-base-100 w-full shadow-2xl">
          <form className="card-body">
            <div className="form-control">
              <label className="label">
                <span className="label-text">メールアドレス</span>
              </label>
              <input
                id="email"
                name="email"
                type="email"
                placeholder="例）mail@example.com"
                className="input input-bordered"
                required
              />
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text">パスワード</span>
              </label>
              <input
                id="password"
                name="password"
                type="password"
                placeholder="例）Pass000"
                className="input input-bordered"
                required
              />
              <label className="label">
                <a
                  href="/forgot-password"
                  className="label-text-alt link link-hover"
                >
                  パスワードを忘れた方
                </a>
              </label>
            </div>
            <div className="form-control mt-2">
              <button className="btn btn-secondary" formAction={login}>
                ログイン
              </button>
            </div>
            <div className="form-control mt-2">
              <button className="btn btn-primary" formAction={signup}>
                新規登録
              </button>
            </div>
            <div className="form-control">
              <FormMessage message={searchParams} />
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
