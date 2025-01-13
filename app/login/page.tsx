import { login, signup } from './actions';

export default function LoginPage() {
  return (
    <div className="bg-base-200 flex justify-center items-center min-h-screen">
      <div className="max-w-md w-full">
        <div className="card bg-base-100 w-full shadow-2xl">
          <form className="card-body">
            <div className="form-control">
              <label className="label">
                <span className="label-text">Email</span>
              </label>
              <input
                id="email"
                name="email"
                type="email"
                placeholder="email"
                className="input input-bordered"
                required
              />
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Password</span>
              </label>
              <input
                id="password"
                name="password"
                type="password"
                placeholder="password"
                className="input input-bordered"
                required
              />
              <label className="label">
                <a href="#" className="label-text-alt link link-hover">
                  パスワードを忘れた方
                </a>
              </label>
            </div>
            <div className="form-control mt-2">
              <button className="btn btn-primary" formAction={login}>
                ログイン
              </button>
            </div>
            <div className="form-control mt-2">
              <button className="btn btn-secondary" formAction={signup}>
                新規登録
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
