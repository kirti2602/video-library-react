import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Toast = () => {
  return (
    <ToastContainer
      position="bottom-right"
      autoClose={2000}
      hideProgressBar={false}
      pauseOnHover
      rtl={false}
      newestOnTop
      draggable
    />
  );
};

export default Toast;