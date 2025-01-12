const Loading = () => {
  return (
    <div className="hero bg-base-200 min-h-screen">
      <div className="hero-content text-center">
        <div className="max-w-md">
          <h1 className="text-5xl font-bold">
            <span className="loading loading-dots loading-lg"></span>
          </h1>
          <p className="py-6">Now loading..</p>
        </div>
      </div>
    </div>
  );
};

export default Loading;
