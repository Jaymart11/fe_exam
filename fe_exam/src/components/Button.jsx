import React from "react";

function Button({ type, value, onClick }) {
  return (
    <button
      type={type}
      className="bg-[#667fff] hover:bg-[#8ea0f8] text-white font-semibold rounded-md py-2 px-4 w-full"
      onClick={onClick}
    >
      {value}
    </button>
  );
}

export default Button;
