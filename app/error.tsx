'use client';

const ErrorPage = () => {
  return (
    <div className="hero bg-base-200 min-h-screen">
      <div className="hero-content text-center">
        <div className="max-w-md">
          <h1 className="text-5xl font-bold">500</h1>
          <p className="py-6">エラーが発生しました</p>
          <a href="/login" className="btn btn-secondary mt-8">
            ログイン
          </a>
        </div>
      </div>
    </div>
  );
};

export default ErrorPage;
