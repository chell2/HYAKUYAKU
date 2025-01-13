'use client';

export default function ConfirmPage() {
  return (
    <div className="hero bg-base-200 min-h-screen">
      <div className="hero-content text-center">
        <div className="max-w-md">
          <h1 className="text-5xl font-bold">登録手続き中..</h1>
          <p className="py-6">
            ご入力のメールアドレス宛に確認メールを送信しました。
            <br />
            メール本文のリンクより、ユーザー登録を完了してください。
          </p>
        </div>
      </div>
    </div>
  );
}
