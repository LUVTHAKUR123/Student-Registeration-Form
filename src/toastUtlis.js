import { toast, Slide } from "react-toastify";

export const successToast = (message) => {
  toast.success(message || "success", {
    position: "top-right",
    autoClose: 3000,
    theme: "colored",
    transition: Slide,
  });
};

export const errorToast = (message) => {
  toast.error(message || "something went wrong", {
    position: "top-right",
    autoClose: 3000,
    theme: "colored",
    transition: Slide,
  });
};
