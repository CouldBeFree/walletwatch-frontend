import axios from "axios";
import router from "@/router";
import { LOCAL_STORAGE_TOKEN_NAME, LOGIN_URL, REGISTER_URL } from "@/constants";

export const Gateway = axios.create({
  baseURL: 'http://localhost:8085',
  withCredentials: false,
  headers: {
    Accept: 'application/json',
    'Content-type': 'application/json'
  }
});

const onResponse = (response) => {
  console.log('res');
  const { authorization } = response.headers;
  console.log('authorization', authorization);
  console.log('headers', response);
  if (authorization) {
    const token = authorization.replace('Bearer ', '');
    localStorage.setItem(LOCAL_STORAGE_TOKEN_NAME, token);
  }
  return response;
};

const onRequest = (request) => {
  const { url } = request;
  const token = localStorage.getItem(LOCAL_STORAGE_TOKEN_NAME);
  const { headers } = request;
  if (token && (url !== LOGIN_URL && url !== REGISTER_URL)) headers.authorization = token;
  return request;
};

const onResponseError = (error) => {
  const { status } = error.response;
  if (status === 401) {
    localStorage.removeItem(LOCAL_STORAGE_TOKEN_NAME);
    router.push('/auth/login');
  }
  return Promise.reject(error);
}

Gateway.interceptors.request.use(onRequest);
Gateway.interceptors.response.use(onResponse, onResponseError);
