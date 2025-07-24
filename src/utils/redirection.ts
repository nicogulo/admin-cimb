/* eslint-disable import/prefer-default-export */

export const getRedirectHref = (path: string) => {
  if (
    path === "/dashboard" ||
    path.includes("register") ||
    path.includes("sign-in")
  ) {
    return "/auth/sign-in";
  }

  return `/auth/sign-in?redirect=${path}`;
};
