export const LoginRequired = () => {
  return (
    <div className="flex flex-grow justify-center flex-col items-center">
      <h1 className="text-gray-800 text-3xl text-center font-semibold mb-4">
        Login Required
      </h1>
      <h3 className="text-gray-600 text-xl text-center font-semibold mb-4">
        Please log in to use this app
      </h3>
    </div>
  );
};
