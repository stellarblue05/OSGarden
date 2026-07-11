import { useRouteError } from "react-router-dom";

export default function Error() {
  const error = useRouteError();
  console.log(error);

  return (
    <pre>
      {JSON.stringify(error, null, 2)}
    </pre>
  );
}