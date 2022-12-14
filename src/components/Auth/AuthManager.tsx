import { useAuth0 } from "@auth0/auth0-react";
import { useSelectorWithSync } from "@glue4/redux/dist";
import { PropsWithChildren } from "react";
import { LoginRequired } from "./LoginRequired";
import { LoadingState } from "./LoadingState";

export const AuthManager = (props: PropsWithChildren) => {
  const { isLoading, isAuthenticated } = useAuth0();

  // `ready` indicates if the initial Glue4 state
  // has been successfully sync'd from the server
  const [, { ready }] = useSelectorWithSync(() => {});

  if (!ready || isLoading) {
    return <LoadingState />;
  }

  return !isAuthenticated ? <LoginRequired /> : <>{props.children}</>;
};
