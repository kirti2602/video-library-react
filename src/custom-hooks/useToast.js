import { toast } from "react-toastify";

const useToast = () => {
  const showToast = (type, message) => {
    toast[type](message, {
      position: "bottom-right",
      autoClose: 2000,
      hideProgressBar: false,
      pauseOnHover: true,
      rtl: false,
      newestOnTop: true,
      draggable: true,
    });
  };

  return { showToast };
};

export { useToast };
