/* eslint-disable import/prefer-default-export */
import { OptionsType } from "cookies-next/lib/types";

import { getCookie, removeCookie, setCookie } from "./cookies";
import { isBrowser } from "./browser";
import { APP_ENV } from "@/config/config";

const isDevelopment = APP_ENV?.toLocaleLowerCase() === "development";
const hashKey = isDevelopment ? "devuhashadmin" : "uhashadmin";
const tokenKey = isDevelopment ? "devtxbhashadmin" : "xtbhashadmin";

export const getAuth = (options?: OptionsType) => {
  const uhash = getCookie(hashKey, options) ?? undefined;
  const xtbhash = getCookie(tokenKey, options) ?? undefined;

  const checkAuth = Boolean((uhash && xtbhash) || xtbhash);

  return {
    token: checkAuth ? xtbhash : undefined,
    hash: uhash || undefined,
    isLoggedIn: checkAuth || false,
  };
};

export const setAuth = ({ hash, token }: Auth) => {
  if (hash) setCookie(hashKey, hash);
  if (token) setCookie(tokenKey, token);

  return true;
};

if (isBrowser && isDevelopment) {
  window.setAuth = setAuth;
}

export const resetAuth = () => {
  removeCookie(hashKey);
  removeCookie(tokenKey);

  return true;
};
