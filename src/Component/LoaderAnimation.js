import React from "react";

export default function LoaderAnimation() {
  return (
    <div className="main">
  <div
    role="status"
    className="absolute -translate-x-1/2 -translate-y-1/2 top-2/4 left-1/2"
  >
    <div className="flex justify-center items-center">
      <svg
        className="animate-spin h-12 w-12 text-blue-500"
        viewBox="0 0 24 24"
      >
        <circle
          className="opacity-25"
          cx="12"
          cy="12"
          r="10"
          stroke="currentColor"
          strokeWidth="4"
          fill="none"
        ></circle>
        <path
          className="opacity-75"
          fill="currentColor"
          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 4.418 3.582 8 8 8v-4zm10-1.858c-.38 2.608-2.76 4.705-5.651 5.156A7.98 7.98 0 0112 20h4c1.381 0 2.664-.354 3.786-.975l-1.786-2.542zM12 4c1.381 0 2.664.354 3.786.975l1.787-2.542A7.964 7.964 0 0112 4V0zm5.657 7.657a8.053 8.053 0 01-1.414 1.414l2.542 1.787A7.98 7.98 0 0120 12h-4zm-7.657-5.657a8.053 8.053 0 011.414-1.414L8.975 3.786A7.964 7.964 0 0112 4H8z"
        ></path>
      </svg>
    </div>
  </div>
</div>

  );
}
