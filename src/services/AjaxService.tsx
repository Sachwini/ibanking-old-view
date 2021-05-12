import axios from "axios";
import { getBearerToken } from "./AuthService";
import { client_id } from "./Constants";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { baseUrl } from "./BaseUrl";

const baseEndPoint = baseUrl;

const instance = axios.create({
  baseURL: baseEndPoint,
});

instance.interceptors.request.use(
  function (config: any) {
    const token = getBearerToken();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
      config.headers.client = client_id;
    }

    return config;
  },
  function (err: any) {
    return Promise.reject(err);
  }
);

instance.interceptors.response.use(
  function (response: any) {
    return response;
  },
  function (error: any) {
    if (error.response && error.response.status === 401) {
      // goToLoginPage();
      toast.error("unAuthorized client");
    } else {
      return Promise.reject(error);
    }
  }
);

export function handleError(error: any, onError?: false | (() => void)) {
  // console.log(error);
  const statusCode =
    error.response !== undefined ? error.response.status : 500 || 500;

  var errorTitle = "Task failed, please retry.";
  if (
    error.response &&
    error.response.data &&
    error.response.data.ExceptionMessage
  )
    errorTitle = `Failed. ${error.response.data.ExceptionMessage}`;

  if (statusCode === 404) {
    errorTitle = "Content or Resource not found";
  }

  if (statusCode === 400) {
    errorTitle = "Invalid request";
  }

  if (statusCode === 401) {
    errorTitle = "Unauthorized, please login again.";
  }

  // alert(errorTitle);
  toast(errorTitle);
  if (onError) onError();
}

export async function get<TResponse>(url: string) {
  return instance.get<TResponse>(url)
    // .catch((error: any) => {
    // handleError(error);
    // throw error;
    // }
    // );
}

export async function post<TResponse>(
  url: string,
  body: {},
  onError?: false | (() => void)
) {
  const res = await instance.post<TResponse>(url, body);
  return res && res;
  // try {
  //   const res = await instance.post<TResponse>(url, body);
  //   return res && res;
  // } catch (error) {
  //   handleError(error, onError);
  //   console.log(error.response.data);
  // }
}
