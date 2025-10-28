"use client";
import { useForm } from "react-hook-form";
import { ErrorMessage } from "@hookform/error-message";
import { BiError } from "react-icons/bi";
import { ToastContainer } from "react-toastify";
import { ScaleLoader } from "react-spinners";
import { FcGoogle } from "react-icons/fc";
import { Formtype } from "./onSubmit.";
import { onSubmit, signinGoogle } from "./onSubmit.";
import { FormEvent } from "react";
import { useRouter } from "next/navigation";
const passwordTester: [RegExp, string][] = [
  [/.{6}/, "It must contain up to six characters"],
  [/\w/, "It must contain an alphabet"],
  [/[0-9]/, "It must contain a digit"],
];

export default function Signup() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting, isSubmitSuccessful },
  } = useForm<Formtype>();
  const router = useRouter();
  return (
    <>
      <div
        className={`flex h-[100vh] justify-center items-center ${
          isSubmitting ? "opacity-40" : ""
        }`}
      >
        <form
          className="flex bg-(--bg-dark) gap-7 flex-col pt-10 px-7 pb-15 rounded-2xl shadow-md w-[70vw] min-w-[320px] max-w-[400px]"
          onSubmit={handleSubmit(
            async (data: Formtype, e: FormEvent<HTMLFormElement>) => {
              await onSubmit(data, e, router);
            }
          )}
        >
          <div>
            <h2>Hello!</h2>
            <p>create an account to get started with GELND</p>
          </div>
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
              <h4>Username</h4>
              <input
                {...register("username", {
                  required: {
                    value: true,
                    message: "username is required",
                  },
                  pattern: {
                    value: /^[\w_]{3,}/,
                    message: "must be at least three characters",
                  },
                })}
                placeholder="username"
                className="border-1 border-(--border-light) text-(--text) px-2 py-1 w-full rounded-lg focus:outline-none"
              />
              {errors.username?.message && (
                <ErrorMessage
                  errors={errors}
                  name="username"
                  render={({ message }) => (
                    <p
                      key={message}
                      className="flex items-center text-(--danger)! shake-horizontal"
                    >
                      <BiError className="inline " />
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
                    message: "password is required",
                  },
                  validate: (value: string) => {
                    for (const [test, msg] of passwordTester) {
                      if (!test.test(value)) return msg;
                    }
                    return true;
                  },
                })}
                placeholder="password"
                className="border-1 border-(--border-light) text-(--text) px-2 py-1 w-full rounded-lg focus:outline-none"
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
                      <BiError className="inline " />
                      {message}
                    </p>
                  )}
                />
              )}
            </div>
          </div>
          <input
            className="border-1 px-2 py-2 flex items-center rounded-2xl border-(--border-light) bg-(--border-light) duration-200 hover:bg-(--border-muted)"
            type="submit"
            value="S U B M I T"
            disabled={isSubmitting || isSubmitSuccessful}
          />
          <div>
            <h2 className="text-center">OR</h2>
            <button
              type="button"
              className="border-1 px-2 py-2 border-(--border) bg-(--border-light) max-w-25 duration-400 hover:border-(--border-muted)"
              onClick={() => signinGoogle(router)}
            >
              <FcGoogle className="inline" /> <p className="inline">Google</p>
            </button>
          </div>
        </form>
      </div>
      {isSubmitting && (
        <ScaleLoader
          height={35}
          width={4}
          color="#000000"
          cssOverride={{
            position: "absolute",
            top: "50%",
            right: "50%",
            zIndex: 2,
          }}
        />
      )}
      <ToastContainer />
    </>
  );
}
