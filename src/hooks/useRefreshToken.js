import axios from "../api/axios";
import useAuth from "./useAuth";

const useRefreshToken = () => {
  const { setAuth } = useAuth();

  const refresh = async () => {
    try {
      const response = await axios.get("/refresh", {
        withCredentials: true,
      });
      const { name, avatar, email, accessToken } = response.data;
      setAuth({ name, avatar, email, accessToken });
      return response.data.accessToken;
    } catch (err) {
      setAuth();
    }
  };
  return refresh;
};

export default useRefreshToken;