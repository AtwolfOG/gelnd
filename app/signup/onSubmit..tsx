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
    }://${window.location.host}/login`;
    await sendEmailVerification(user, { url });
    toast.info("Go to your inbox to verify your email", {
      position: "top-right",
      autoClose: 5000,
      closeButton: true,
      theme: "light",
      transition: Bounce,
    });
    const interval = setInterval(async () => {
      if (user && user.emailVerified) {
        const IdToken = await user.getIdToken();
        clearInterval(interval);
        console.log(IdToken);
        const res = await fetch("api/sessionLogin", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ IdToken, username: data.username }),
        });
        toast.success("email verified", {
          position: "top-center",
          autoClose: false,
          closeButton: true,
          theme: "light",
          transition: Bounce,
        });
        router.push("/home");
      } else {
        user.reload();
      }
    }, 5000);
  } catch (err) {
    let errMsg = "An error occured";
    if (err instanceof Error) errMsg = err.message;
    toast.error(errMsg, {
      position: "top-center",
      autoClose: false,
      closeButton: true,
      theme: "light",
      transition: Bounce,
    });
  }
}

const provider = new GoogleAuthProvider();

export async function signinGoogle(router: AppRouterInstance) {
  try {
    // setPersistence(auth, browserLocalPersistence);
    const unsub = onAuthStateChanged(auth, async (user) => {
      if (user) {
        const IdToken = await user.getIdToken();
        const res = await fetch("api/sessionLogin", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ IdToken, username: user.displayName }),
        });
        router.push("/home");
      }
    });
    const result = await signInWithPopup(auth, provider);
    const user = result.user;
    const credentials = GoogleAuthProvider.credentialFromResult(result);
  } catch (error) {
    console.log(error);
  }
}
