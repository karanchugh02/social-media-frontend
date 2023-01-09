import toast from "react-hot-toast";
import TopBarProgress from "react-topbar-progress-indicator";

const createToast = (message: string) => {
  let newToast = toast.loading(message);
  return newToast;
};

const updateSuccessToast = (id: string, message: string) => {
  toast.success(message, {
    id: id,
  });
};

const updateErrorToast = (id: string, message: string) => {
  toast.error(message, {
    id: id,
  });
};

TopBarProgress.config({
  barColors: {
    0: "#ffffff",
    "1.0": "#ffffff",
  },
  shadowBlur: 5,
});

export { createToast, updateErrorToast, updateSuccessToast, TopBarProgress };
