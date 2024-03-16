import axios from "axios";

const instance = axios.create();
instance.defaults.headers.post["Content-Type"] = "application/json";
instance.defaults.headers["Accept"] = "application/json";
instance.defaults.timeout = 60000;

instance.interceptors.response.use(
  //@ts-ignore
  function (response) {
    const responseObject: any = {
      data: response?.data,
    };
    return responseObject;
  },
  async function (error) {
    if (error?.response?.status === 403) {
    } else {
      return "Something went wrong";
    }
  }
);

export { instance };
