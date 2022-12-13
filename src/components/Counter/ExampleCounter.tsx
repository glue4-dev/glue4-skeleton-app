import { useDispatch, useSelector } from "react-redux";
import { increment, reset } from "../../features/counter/counterSlice";
import { RootState } from "../../store/store";

export const ExampleCounter: React.FC = () => {
  const dispatch = useDispatch();

  const counter = useSelector((state: RootState) => state.counter);

  return (
    <div className="flex justify-center flex-col flex-grow items-center">
      <h1 className="text-gray-800 text-3xl text-center font-semibold mb-4">
        Sync Counter
      </h1>
      <div className="w-full max-w-sm bg-white rounded-lg shadow-lg p-4">
        <button
          type="submit"
          className="block w-full p-3 mt-3 rounded-lg bg-blue-500 text-white font-bold hover:bg-blue-400"
          onClick={() => dispatch(increment(1))}
        >
          Increment
        </button>
        <button
          type="submit"
          className="block w-full p-3 mt-3 rounded-lg bg-blue-500 text-white font-bold hover:bg-blue-400"
          onClick={() => dispatch(reset())}
        >
          Reset
        </button>
        <h3 className="text-gray-800 mt-3 text-xl text-center font-semibold mb-4">
          Current Sync Count: {counter}
        </h3>
      </div>
    </div>
  );
};
