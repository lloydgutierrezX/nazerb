import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <div className="flex flex-col h-[100vh] justify-center justify-self-center items-center">
      <h1 className="text-9xl font-bold font-sans text-red-600">OOPS!</h1>
      <h3 className="font-bold text-2xl">404 - Page not found</h3>
      <label className="text-sm">
        The page you are looking for might not have been removed
      </label>
      <label className="text-sm">
        had its name changed or is temporarily unavailable.
      </label>

      <Link to="/" className="btn btn-link">
        Go to Home page
      </Link>
    </div>
  );
}
