import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useNavigate } from "react-router-dom";

import { useAuth } from "@/features/auth/hooks/useAuth";
import {
  loginSchema,
  type LoginFormData,
} from "@/features/auth/schema/loginSchema";

export default function LoginForm() {
  const { signIn } = useAuth();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
  });

  async function onSubmit(data: LoginFormData) {
    try {
      await signIn({
        username: data.username,
        password: data.password,
      });

      console.log("Login successful");

      navigate("/");
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="mt-8 space-y-6">
      <div>
        <label
          htmlFor="username"
          className="block text-sm font-medium text-gray-700"
        >
          Username or Email
        </label>

        <input
          id="username"
          type="text"
          placeholder="Enter your username"
          className="mt-1 w-full rounded-lg border border-gray-300 px-4 py-2"
          {...register("username")}
        />

        {errors.username && (
          <p className="mt-1 text-sm text-red-600">
            {errors.username.message}
          </p>
        )}
      </div>

      <div>
        <label
          htmlFor="password"
          className="block text-sm font-medium text-gray-700"
        >
          Password
        </label>

        <input
          id="password"
          type="password"
          placeholder="Enter your password"
          className="mt-1 w-full rounded-lg border border-gray-300 px-4 py-2"
          {...register("password")}
        />

        {errors.password && (
          <p className="mt-1 text-sm text-red-600">
            {errors.password.message}
          </p>
        )}
      </div>

      <button
        type="submit"
        className="w-full rounded-lg bg-black px-4 py-2 text-white hover:opacity-90"
      >
        Sign In
      </button>
    </form>
  );
}
