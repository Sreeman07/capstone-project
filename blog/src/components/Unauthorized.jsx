import { useEffect } from "react";
import { useNavigate, useLocation } from "react-router";

const Unauthorized = ({ delay = 3000 }) => {
  const navigate = useNavigate();
  const location = useLocation();

  const redirectTo = location.state?.redirectTo || "/login";

  useEffect(() => {
    const timer = setTimeout(() => {
      navigate(redirectTo, { replace: true });
    }, delay);

    return () => clearTimeout(timer);
  }, [navigate, redirectTo, delay]);

  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-gray-100 text-center px-4">
      
      <h1 className="text-4xl font-bold text-red-600 mb-4">
        403 - Unauthorized
      </h1>

      <p className="text-lg text-gray-700 mb-2">
        You don’t have permission to access this page.
      </p>

      <p className="text-sm text-gray-500 mb-4">
        Redirecting in a few seconds...
      </p>

      {/* ✅ Manual redirect button */}
      <button
        onClick={() => navigate(redirectTo)}
        className="bg-blue-600 text-white px-5 py-2 rounded-lg hover:bg-blue-700"
      >
        Go Now
      </button>
    </div>
  );
};

export default Unauthorized;