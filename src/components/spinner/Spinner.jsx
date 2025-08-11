const Spinner = ({ width = "5", height = "5" }) => {
  const fallback = "w-5 h-5";
  const sizeClasses = `w-${width} h-${height}` || fallback;

  return (
    <svg
      aria-hidden="true"
      className={`inline ${sizeClasses} text-gray-200 animate-spin dark:text-gray-600 fill-blue-600`}
      viewBox="0 0 100 101"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591..."
        fill="currentColor"
      />
      <path
        d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116..."
        fill="currentFill"
      />
    </svg>
  );
};

export default Spinner;