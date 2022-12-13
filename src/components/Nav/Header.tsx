import { useAuth0 } from "@auth0/auth0-react";
import { SyncStatus } from "./SyncStatus";

const Header = () => {
  const { loginWithRedirect, user, isLoading, logout } = useAuth0();
  return (
    <header className="bg-gray-200 p-4 shadow-md w-screen">
      <div className="mx-auto flex items-center justify-between">
        <a>
          <h1 className="text-lg font-semibold text-gray-700">
            Glue4 Skeleton App
          </h1>
        </a>
        <SyncStatus />
        <div className="flex items-center">
          <p className="mr-2 text-gray-600">
            {isLoading ? "Loading..." : user?.email || "Not logged in"}
          </p>
          {user ? (
            <button
              className="bg-gray-300 py-1 px-3 rounded-lg text-gray-700 hover:bg-gray-400"
              onClick={() => logout()}
            >
              Logout
            </button>
          ) : (
            <button
              className="bg-gray-300 py-1 px-3 rounded-lg text-gray-700 hover:bg-gray-400"
              onClick={() => loginWithRedirect()}
            >
              Login
            </button>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
