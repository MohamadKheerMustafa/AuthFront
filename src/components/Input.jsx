import React from "react";

const Input = ({ lable, type, className, placeHolder, onChange , value }) => {
  return (
    <div className="flex flex-col justify-center m-auto">
      <h1 className="mt-2 text-xl font-semibold text-gray-300">{lable}</h1>
      <div className="flex mt-auto ">
        <input
          type={type}
          name={lable}
          placeholder={placeHolder}
          className={
            `p-4 mt-2 w-[250px] h-[25px] border-[2px] rounded-xl ` + className
          }
          onChange={onChange}
          value={value}
        />
      </div>
    </div>
  );
};

export default Input;
