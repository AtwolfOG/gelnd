import {
  GoogleAuthProvider,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signInWithPopup,
} from "firebase/auth";
import { auth } from "@/lib/firebase";
import type { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";
import type { FormEvent } from "react";
import { toastError, toastSuccess } from "@/components/toast";

export interface LoginFormType {
  email: string;
  password: string;
}
export async function onSubmit(
  data: LoginFormType,
  e: FormEvent<HTMLFormElement>,
  router: AppRouterInstance
) {
  try {
    e.preventDefault();
    const { email, password } = data;
    const userCreadentials = await signInWithEmailAndPassword(
      auth,
      email,
      password
    );
    const idToken = await userCreadentials.user.getIdToken();
    const res = await fetch("/api/sessionLogin", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ idToken }),
    });
    const resdata = await res.json();
    if (res.ok) {
      toastSuccess(resdata.message);
      router.push("/user/dashboard");
    } else {
      throw new Error(resdata.message);
    }
  } catch (error) {
    let errorMsg = "An unexpected error occured pls try again";
    if (error.code) return toastError(error.code);
    if (error instanceof Error) errorMsg = error.message;
    toastError(errorMsg);
  }
}

const provider = new GoogleAuthProvider();

export async function signinGoogle(router: AppRouterInstance) {
  try {
    onAuthStateChanged(auth, async (user) => {
      if (user) {
        const idToken = await user.getIdToken();
        const res = await fetch("api/sessionLogin", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ idToken }),
        });
        const data = await res.json();
        if (res.ok) {
          toastSuccess(data.message);
          router.push("/user/dashboard");
        } else {
          toastError(data.message);
        }
      }
    });
    const result = await signInWithPopup(auth, provider);
  } catch (error) {
    if (error?.code) {
      toastError(error.code);
    }
  }
}
