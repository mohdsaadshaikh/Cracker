import { useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  useLoginUserMutation,
  useRegisterUserMutation,
} from "../../redux/apis/authApi";
import Logo from "../../components/Logo";
import toast from "react-hot-toast";
import PasswordInput from "../../components/PasswordInput";
import Input from "../../components/Input";
import { setAuthenticated } from "../../redux/slice/auth";

const loginSchema = yup.object().shape({
  email: yup.string().email("Invalid email").required("Email is required"),
  password: yup
    .string()
    .min(8, "Password must be at least 8 characters long")
    .required("Password is required"),
});

const registerSchema = yup.object().shape({
  name: yup.string().required("Name is required"),
  email: yup.string().email("Invalid email").required("Email is required"),
  password: yup
    .string()
    .min(8, "Password must be at least 8 characters long")
    .required("Password is required"),
});

const Auth = () => {
  const [isRegistering, setIsRegistering] = useState(false);
  const schema = isRegistering ? registerSchema : loginSchema;

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const [loginUser, { isLoading: isLoggingIn }] = useLoginUserMutation();
  const [registerUser, { isLoading: isRegisteringUser }] =
    useRegisterUserMutation();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const onSubmit = async (data) => {
    try {
      if (isRegistering) {
        await registerUser(data).unwrap();
        toast.success("Registration successful!");
        setIsRegistering(false);
      } else {
        await loginUser(data).unwrap();
        toast.success("Login successful!");
      }
      dispatch(setAuthenticated());
      navigate("/");
    } catch (error) {
      console.log(error);
      toast.error(error?.data?.message || "someThing went wrong");
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen w-full">
      <div className="w-full max-w-md rounded-lg p-6">
        <div className="flex flex-col justify-center items-center gap-6 my-6 w-full">
          <Logo />
          <h2 className="text-3xl ">
            {isRegistering ? "Create your account" : "Login to your account"}
          </h2>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          {isRegistering && (
            <Input
              label="Name"
              placeholder="Enter your name"
              register={register}
              errors={errors}
              name="name"
            />
          )}
          <Input
            label="Email"
            type="email"
            placeholder="Enter your email"
            register={register}
            errors={errors}
            name="email"
          />

          <PasswordInput register={register} errors={errors} />

          <button
            type="submit"
            // className="btn btn-primary w-full text-lg text-white"
            className={`btn bg-[#a66dd4] w-full text-lg text-white
               ${
                 isRegistering
                   ? isRegisteringUser
                     ? "loading"
                     : ""
                   : isLoggingIn
                   ? "loading"
                   : ""
               }`}
          >
            {isRegistering ? "Register" : "Login"}
          </button>
        </form>

        <div className="text-center mt-4">
          <p
            className="cursor-pointer text-blue-500"
            onClick={() => setIsRegistering(!isRegistering)}
          >
            {isRegistering ? (
              <>
                Already have an account?{" "}
                <span className="underline">Login here</span>
              </>
            ) : (
              <>
                Dont have an account?{" "}
                <span className="underline">Register here</span>
              </>
            )}
          </p>
        </div>
      </div>
    </div>
  );
};

export default Auth;
