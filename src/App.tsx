import "./App.css";
import Header from "./components/Nav/Header";
import { AuthManager } from "./components/Auth/AuthManager";
import { store } from "./store/store";
import { ExampleCounter } from "./components/Counter/ExampleCounter";
import { Provider } from "@glue4/redux";

function App() {
  return (
    <Provider store={store}>
      <div className="flex flex-col bg-slate-100 pb-8 min-h-screen">
        <Header></Header>
        <AuthManager>
          {/* Your components go here */}
          <ExampleCounter />
        </AuthManager>
      </div>
    </Provider>
  );
}

export default App;
