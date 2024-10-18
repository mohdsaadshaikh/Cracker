import { useState } from "react";
import { EyeOutlined, EyeInvisibleOutlined } from "@ant-design/icons";

const PasswordInput = ({ register, errors }) => {
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  const togglePasswordVisibility = () => {
    setIsPasswordVisible((prev) => !prev);
  };

  return (
    <div className="form-control w-full">
      <label className="label">
        <span className="label-text text-base dark:text-white">Password</span>
      </label>

      <div className="relative">
        <input
          id="toggle-password"
          type={isPasswordVisible ? "text" : "password"}
          placeholder="Enter your password"
          className={`input py-3 ps-4 pe-10 block w-full border rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-900 dark:border-neutral-700 dark:text-neutral-400 dark:placeholder-neutral-500 dark:focus:ring-neutral-600 ${
            errors.password ? "border-red-500" : "border-gray-200"
          }`}
          {...register("password")}
        />
        <button
          type="button"
          onClick={togglePasswordVisibility}
          className="absolute inset-y-0 end-0 flex items-center z-20 px-3 cursor-pointer text-gray-400 rounded-e-md focus:outline-none focus:text-blue-600 dark:text-neutral-600 dark:focus:text-blue-500"
        >
          {isPasswordVisible ? <EyeOutlined /> : <EyeInvisibleOutlined />}
        </button>
      </div>

      {errors.password && (
        <span className="text-red-500 text-sm">{errors.password.message}</span>
      )}
    </div>
  );
};

export default PasswordInput;
