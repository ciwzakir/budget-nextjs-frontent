// import { instance as axiosInstance } from "@/helpers/axios/axiosInstance";
// import { getBaseUrl } from "@/helpers/config/envConfig";
// import { decodedToken } from "@/utils/jwt";

import { authKey } from "@/constants/storageKey";
import { decodedToken } from "@/utils/jwt";
import { getFromLocalStorage, setToLocalStorage } from "@/utils/local-storage";

export const storeUserInfo = ({ token }: { token: string }) => {
  return setToLocalStorage(authKey, token as string);
};

export const getUserInfo = () => {
  const authToken = getFromLocalStorage(authKey);
  // console.log("authToken", authToken);
  if (authToken) {
    const decodedData = decodedToken(authToken);
    // console.log("authToken", decodedData);
    return decodedData;
  } else {
    return "";
  }
};

export const isLoggedIn = () => {
  const authToken = getFromLocalStorage(authKey);
  return !!authToken;
};

export const removeUserInfo = (key: string) => {
  return localStorage.removeItem(key);
};

// export const getNewAccessToken = async () => {
//   return await axiosInstance({
//     url: `${getBaseUrl()}/auth/refresh-token`,
//     method: "POST",
//     headers: { "Content-Type": "application/json" },
//     withCredentials: true,
//   });
// };
