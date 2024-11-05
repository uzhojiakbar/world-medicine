import { useLocation, useNavigate } from "react-router-dom";

function useCustomNavigate() {
  const navigate = useNavigate();
  const location = useLocation();

  return (targetPath) => {
    if (location.pathname !== targetPath) {
      navigate(targetPath);
    }
  };
}

export default useCustomNavigate;
