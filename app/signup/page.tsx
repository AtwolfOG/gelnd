"use client";
import { useForm } from "react-hook-form";
import { ErrorMessage } from "@hookform/error-message";

const passwordTester: [RegExp, string][] = [
  [/.{6}/, "It must contain up to six characters"],
  [/[A-Z]/, "It must contain an uppercase character"],
  [/[a-z]/, "It must contain a lowercase character"],
  [/[0-9]/, "It must contain a digit"],
];

export default function Page() {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();
  const password = watch("password");
  return (
    <div className="flex h-[100vh] justify-center items-center">
      <form
        className="flex bg-(--bg-dark) gap-2 flex-col pt-10 px-7 pb-15 rounded-2xl border-1 w-[70vw] max-w-[400px]"
        action=""
      >
        <input
          {...register("email", {
            required: {
              value: true,
              message: "Email is required",
            },
            pattern: {
              value: /^[\w+._%-]@[\w-.]+\.\w+/i,
              message: "must be a valid email",
            },
          })}
          placeholder="johndoe@gmail.com"
          className="border-1 px-2 py-1 rounded focus:outline-none"
        />
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
          placeholder="john"
        />
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
        />
        <input
          type="password"
          {...register("confirm-password", {
            required: {
              value: true,
              message: "password is required",
            },
            validate: (value: string) => {
              if (!(value === password)) return "password must be the same";
              return true;
            },
          })}
          placeholder="confirm password"
        />
        <input type="submit" value="SUBMIT" />
      </form>
    </div>
  );
}
