import { FormEvent } from "react";
import { auth } from "@/lib/firebase";
import {
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  onAuthStateChanged,
  sendEmailVerification,
  signInWithPopup,
} from "firebase/auth";
import { toast, Bounce } from "react-toastify";
import { browserLocalPersistence, setPersistence } from "firebase/auth";
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";
import { toastError } from "@/components/toast";

export type Formtype = {
  email: string;
  username: string;
  password: string;
};
export async function onSubmit(
  data: Formtype,
  e: FormEvent<HTMLFormElement>,
  router: AppRouterInstance
) {
  e.preventDefault();
  try {
    const userCredentials = await createUserWithEmailAndPassword(
      auth,
      data.email,
      data.password
    );
    const user = userCredentials.user;
    const url = `${
      process.env.NODE_ENV === "development" ? "http" : "https"
    }://${window.location.host}/user/login`;
    await sendEmailVerification(user, { url });
    toast.info("Go to your inbox to verify your email, pls check spam", {
      position: "top-right",
      autoClose: 5000,
      closeButton: true,
      theme: "light",
      transition: Bounce,
    });
    const interval = setInterval(async () => {
      if (user && user.emailVerified) {
        const idToken = await user.getIdToken();
        clearInterval(interval);
        console.log(idToken);
        const res = await fetch("/api/sessionSignup", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            idToken,
            username: data.username,
            provider: "password",
          }),
        });
        const resdata = await res.json();
        if (res.ok) {
          toast.success("email verified", {
            position: "top-center",
            autoClose: false,
            closeButton: true,
            theme: "light",
            transition: Bounce,
          });
          router.push("/user/dashboard");
        } else {
          toastError(resdata.message);
        }
      } else {
        user.reload();
      }
    }, 5000);
  } catch (err) {
    let errMsg = "An error occured";
    if (err.code) return toastError(err.code);
    if (err instanceof Error) errMsg = err.message;
    toastError(errMsg);
    throw err;
  }
}

const provider = new GoogleAuthProvider();

export async function signinGoogle(router: AppRouterInstance) {
  try {
    // setPersistence(auth, browserLocalPersistence);
    const unsub = onAuthStateChanged(auth, async (user) => {
      if (user) {
        const idToken = await user.getIdToken();
        const res = await fetch("api/sessionSignup", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          // this should work for both existing and new user
          body: JSON.stringify({
            idToken,
            username: user.displayName,
            provider: "google",
          }),
        });
        router.push("/user/dashboard");
      }
    });
    const result = await signInWithPopup(auth, provider);
  } catch (error) {
    console.log(error);
  }
}
