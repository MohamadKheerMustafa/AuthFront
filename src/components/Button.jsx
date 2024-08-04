import React from "react";

const Button = ({ title, className, onClick }) => {
  return (
    <div className="flex justify-center items-center">
      <button
        className={`w-[200px] h-[40px] mt-10 m-auto rounded-xl ` + className}
        onClick={onClick}
      >
        {title}
      </button>
    </div>
  );
};

export default Button;
