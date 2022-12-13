import { useAuth0 } from "@auth0/auth0-react";
import { useSelectorWithSync } from "@glue4/redux/dist";
import { PropsWithChildren } from "react";
import { LoginRequired } from "./LoginRequired";
import { LoadingState } from "./LoadingState";

export const AuthManager = (props: PropsWithChildren) => {
  const { user, isLoading } = useAuth0();
  const isAuth = isLoading || user ? true : false;

  // `ready` indicates if the initial status has been successfully pulled from the server
  const [_, { ready }] = useSelectorWithSync(() => {});

  return (
    <>
      {!isAuth ? <LoginRequired /> : !ready && <LoadingState />}
      {isAuth && ready && props.children}
    </>
  );
};
