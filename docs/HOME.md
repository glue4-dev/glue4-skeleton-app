# Glue4 Docs

## Requirements

Glue4 requires relatively recent versions of the Node and React+Redux tool chains:

```
{ "engine": "node" }: "^18.0.0"
"react":              "^18.0.0"
"react-dom":          "^18.0.0"
"react-redux":         "^8.0.0"
"@reduxjs/toolkit":    "^1.9.0"
```

Glue4 _may_ work with lower versions of the listed dependencies, but it is not guaranteed and untested.

## Getting started

The recommended way is to clone the [Glue4 skeleton app repo](https://github.com/glue4-dev/glue4-skeleton-app). However, if you find you'd like to add Glue4 to an existing application or you'd like to start from scratch, you can use the following commands:

```bash
# Install Glue4 as a dependency
> npm i @glue4/redux @glue4/server
# Initialize Glue4 project
> npx @glue4/redux init
```

Add this to your `package.json`'s `scripts` section:

```json
"dev": "concurrently --kill-others \"npm run start\" \"npx @glue4/server\"",
"@glue4/reset": "rm ./.glue4/globalstore.json",
```

And then run your project with:

```bash
> npm run dev
```

This will start the Glue4 development server locally together with the React compiler.

Now visit `http://localhost:3000` to see your Glue4 app running 🙌!

## Components

### `Provider` (required)

Glue4's `<Provider>` component wraps the Redux `<Provider>` and is used as a direct replacement. Additionally, it wraps the OAuth provider and manages the user's auth session to ensure that syncing of client data with the backend happens whenever a user is authenticated.

**Example usage:**

```tsx
// src/index.ts

import { Provider } from "@glue4/redux";
import { store } from "./store/store";

// ...

root.render(
  <Provider store={store}>
    <App />
  </Provider>
);
```

### `configureStore` (required)

Glue4's `configureStore` wraps Redux's `configureStore` and is used as a direct replacement. It ensures that the state slices utilizing the sync functionality are picked up by the internal Glue4 sync manager. It doesn't modify any native Redux behavior, so it may be used with regular reducers as well as sync reducers.

**Example usage:**

```tsx
// src/store/store.ts

import { configureStore } from "@glue4/redux";
import counterReducer from "../features/counter/counterSlice";

export const store = configureStore({
  reducer: {
    counter: counterReducer,
  },
});
```

### `createSyncSlice`

Glue's `createSyncSlice` is an alternative to Redux Toolkit's `createSlice`. It accepts the same parameters and the result has the same shape, but ensures that the contents of this state slice are synced to the server and pulled from the server when the app is loaded. Sync slice states can have any shape, from primitives like strings or number to complex objects or arrays, as long as they are serializable.

_Important: The name given to the slice must match the property name for that reducer in `configureStore`_

**Example usage:**

```tsx
// src/features/counter/counterSlice.ts

import { createSyncSlice } from "@glue4/redux";
import { PayloadAction } from "@reduxjs/toolkit";

const initialState: number = 0;

export const counterSlice = createSyncSlice({
  name: "counter",
  initialState,
  reducers: {
    reset: (_count) => {
      return 0;
    },
    increment: (count, { payload }: PayloadAction<number>) => {
      return count + payload;
    },
  },
});

export const { reset, increment } = counterSlice.actions;

export default counterSlice.reducer;
```

### `useSelectorWithSync`

The `useSelectorWithSync` exposes an array of 2 items, where the first item provides access to the state and the second item exposes the current sync status and any error messages. It may be used as a replacement for `useSelector`.

**Example Usage:**

```tsx
const [state, syncProps] = useSelectorWithSync(() => state.counter);
```

`syncProps` contains the following properties:

- `syncProps.ready` - (boolean) `true` when the initial state sync after app loading has completed successfully.
- `syncProps.pullStatus` - (string: `"loading"|"error"|"success"`) provides details on the latest sync attempt pulling state from the server
- `syncProps.pullError` - (Error | null) if a pull has failed, this will contain the error message. It is reset on a successful pull.
- `syncProps.pushStatus` - (string: `"loading"|"error"|"success"`) provides details on the latest sync attempt pushing state from the client to the server
- `syncProps.pushError` - (Error | null) if a push has failed, this will contain the error message. It is reset on a successful push.

## Authentication

Authentication is built into Glue4 with Auth0. In the future we will decouple the OAuth provider and allow using custom providers, however at the moment that is not supported.

Glue4 requires a valid access token from the Auth provider in order to persist the state, so Glue4 functionalities will _require_ user authentication (i.e. your users will have to sign up or login to use features of your app powered by Glue4).

Auth is implemented by wrapping your application components that require Glue4 functionality with the `<AuthManager>` component.

### `AuthManager`

This component wraps the OAuth provider's login and loading state. Unless you need to handle specific edge cases and display error messages, it is unnecessary to modify this file. Put the AuthManager at the top level of your application to wrap all of the functionality, or alternatively only require `AuthManager` in routes which require authentication.

**Example Usage:**

```tsx
// src/App.tsx

import { AuthManager } from "./components/Auth/AuthManager";

function App() {
  return (
    <AuthManager>
      {/* Your application's components go here.
        They render if the user is authenticated.
      */}
    </AuthManager>
  );
}
```

### `LoginRequired`

User customizable component for how the "login prompt" looks like. Note that this is not the _login screen_ (that is hosted on Auth0 and not customizable at the moment), but rather what the application will display if a login is required and the user is unauthenticated.

### `LoadingState`

A placeholder implementation for the global loading state of the application. The user is encouraged to override the default implementation with their own loading state.

## System Behavior

### Initializing

Glue4 will initiate a pull from the server to hydrate the local state as soon as the app has started up and a valid user session exists. It uses the Auth0 access token to authenticate the user, which is cached locally to speed up initial state hydration without having to wait on Auth0's session.

As soon as the initial pull has been completed, the `ready` property accessed `useSelectorWithSync` will be true and any state slice that was configured via the `createSyncSlice` will be overridden with the server state.

### Updating State

Whenever your local redux store is updated, any state slices that were created with `createSyncSlice` will be synced to the server. The server will take care of persisting the changes. State is versioned, so that if two competing clients who have the same user logged in do not risk overriding each other. Instead, one write will be blocked.

### Pulling State

State from the server is continuously back synced to the client, so that different clients with the same logged in user do not diverge. State is versioned and hashed - versions guarantee that the clients override their local state if they fall behind the server state, while hashes reduce the amount of data transferred between client and server.
