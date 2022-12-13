import { useSelectorWithSync } from "@glue4/redux";

const statusColorMapper = {
  loading: "bg-yellow-300",
  error: "bg-red-300",
  success: "bg-green-300",
};

export const SyncStatus = () => {
  // The sync selector allows you to access the underlying sync status
  const [_state, { pullStatus, pushStatus, ready }] = useSelectorWithSync(
    () => {}
  );

  return (
    <div>
      <span
        className={`py-2 px-3 mr-5 hidden md:inline-block rounded-md ${statusColorMapper[pullStatus]}`}
      >
        Pulling
      </span>
      <span
        className={`py-2 px-3 mr-5 hidden md:inline-block rounded-md ${statusColorMapper[pushStatus]}`}
      >
        Pushing
      </span>
    </div>
  );
};
