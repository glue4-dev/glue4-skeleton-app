import "./App.css";
import Header from "./components/Nav/Header";
import { AuthManager } from "./components/Auth/AuthManager";
import { ExampleCounter } from "./components/Counter/ExampleCounter";

function App() {
  return (
    <div className="flex flex-col bg-slate-100 pb-8 min-h-screen">
      <Header></Header>
      <AuthManager>
        {/* Your components go here */}
        <ExampleCounter />
      </AuthManager>
    </div>
  );
}

export default App;
