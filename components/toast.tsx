import { Bounce, toast } from "react-toastify";

export function toastError(error: string) {
  toast.error(error, {
    position: "top-right",
    transition: Bounce,
    autoClose: 3000,
    closeOnClick: true,
  });
}

export function toastSuccess(message: string) {
  toast.success(message, {
    position: "top-right",
    transition: Bounce,
    autoClose: 3000,
    closeOnClick: true,
  });
}

export function toastInfo(info: string) {
  toast.info(info, {
    position: "top-right",
    transition: Bounce,
    autoClose: 3000,
    closeOnClick: true,
  });
}
