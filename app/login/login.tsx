"use client";

import { ErrorMessage } from "@hookform/error-message";
import { useForm } from "react-hook-form";
import { BiError } from "react-icons/bi";
import { Eye, EyeOff } from "lucide-react";
import { ToastContainer } from "react-toastify";
import { FcGoogle } from "react-icons/fc";
import { onSubmit, signinGoogle, type LoginFormType } from "./onLogin";
import type { FormEvent } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Loader } from "@/components/loading";

const passwordTester: [RegExp, string][] = [
  [/.{6}/, "It must contain up to six characters"],
  [/\w/, "It must contain an alphabet"],
  [/[0-9]/, "It must contain a digit"],
];
export default function Login() {
  const {
    register,
    handleSubmit,
    formState: { isSubmitSuccessful, errors, isSubmitting },
  } = useForm();
  const router = useRouter();
  return (
    <>
      <div
        className={`flex h-[100vh] justify-center items-center ${
          isSubmitting ? "opacity-40" : ""
        }`}
      >
        <form
          action=""
          onSubmit={handleSubmit(
            async (data: LoginFormType, e: FormEvent<HTMLFormElement>) =>
              await onSubmit(data, e, router)
          )}
          className="flex bg-(--bg-dark) gap-7 flex-col pt-10 px-7 pb-15 rounded-2xl shadow-md w-[70vw] min-w-[320px] max-w-[400px]"
        >
          <h2>Login</h2>
          <div className="flex flex-col gap-4">
            <div>
              <h4>Email</h4>
              <input
                {...register("email", {
                  required: {
                    value: true,
                    message: "Email is required",
                  },
                  pattern: {
                    value: /^[\w+._%-]+@[\w-.]+\.\w+/i,
                    message: "must be a valid email",
                  },
                })}
                placeholder="johndoe@gmail.com"
                className="border-1 border-(--border-light) text-(--text) px-2 py-1 rounded-lg w-full focus:outline-none"
              />
              {errors.email?.message && (
                <ErrorMessage
                  errors={errors}
                  name="email"
                  render={({ message }) => (
                    <p
                      key={message}
                      className="flex items-center text-(--danger)! shake-horizontal"
                    >
                      <BiError className="inline" />
                      {message}
                    </p>
                  )}
                />
              )}
            </div>
            <div>
              <h4>Password</h4>
              <input
                type="password"
                {...register("password", {
                  required: {
                    value: true,
                    message: "Password is required",
                  },
                  validate: (value: string) => {
                    for (const [test, msg] of passwordTester) {
                      if (!test.test(value)) return msg;
                    }
                    return true;
                  },
                })}
                placeholder="password"
                className="border-1 border-(--border-light) text-(--text) px-2 py-1 rounded-lg w-full focus:outline-none"
              />
              {errors.password?.message && (
                <ErrorMessage
                  errors={errors}
                  name="password"
                  render={({ message }) => (
                    <p
                      key={message}
                      className="flex items-center text-(--danger)! shake-horizontal"
                    >
                      <BiError className="inline" />
                      {message}
                    </p>
                  )}
                />
              )}
            </div>
            <input
              className="border-1 px-2 py-2 flex items-center rounded-2xl border-(--border-light) bg-(--border-light) duration-200 hover:bg-(--border-muted)"
              type="submit"
              value="L O G I N"
              disabled={isSubmitting || isSubmitSuccessful}
            />
            <div>
              <h2 className="text-center">OR</h2>
              <button
                type="button"
                onClick={() => signinGoogle(router)}
                className="border-1 px-2 py-2 border-(--border) bg-(--border-light) max-w-25 duration-400 hover:bg-(--border-muted)"
              >
                <FcGoogle className="inline" /> <p className="inline">Google</p>
              </button>
            </div>
          </div>
          <Link
            href={"/signup"}
            className="text-center text-(--text-light) underline decoration-(--text-light) underline-offset-1"
          >
            Don&apos;t have an account
          </Link>

          <ToastContainer />
        </form>
      </div>
      {isSubmitting && <Loader height={35} width={4} />}
    </>
  );
}
