import { userLogin } from "../service/loginService";
import { useMutation } from "react-query";
import { useNavigate } from "react-router-dom";

export const useLogin = () => {
  const navigate = useNavigate();
  const login = useMutation((credentials) => userLogin(credentials), {
    onSuccess: () => {
      navigate("/appointment");
    },
    onError: (e) => {
      alert(e.response.data);
    },
  });

  return login;
};
