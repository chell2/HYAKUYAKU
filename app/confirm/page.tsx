'use client';

export default function ConfirmPage() {
  return (
    <div className="hero bg-base-200 min-h-screen">
      <div className="hero-content text-center">
        <div className="card bg-base-100 w-auto shadow-xl">
          <div className="card-body items-center text-center">
            <h2 className="card-title my-4">登録手続き中..</h2>
            <p>
              ご入力のメールアドレス宛に確認メールを送信しました。
              <br />
              メール本文のリンクより、 ユーザー登録を完了してください。
            </p>
            <div className="card-actions justify-end mt-8">
              <a href="/login">
                <button className="btn btn-primary">ログインページへ</button>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
