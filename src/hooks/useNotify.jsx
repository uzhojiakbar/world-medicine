import toast from "react-hot-toast";

const getNotify = () => {
  const notify = (type = "ok", text) => {
    if (type === "ok") {
      return toast.success(text || "Tayyor");
    } else if (type === "err") {
      return toast.error(text || "Qandaydur xatolik");
    } else if (type === "wait") {
      return toast.loading(text || "Yuklanmoqda...");
    }
  };

  return { notify, dismiss: toast.dismiss };
};

export default getNotify;
