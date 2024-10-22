export const tokenKey = "my-token";

export const getToken = (): string | null => {
  if (typeof window !== "undefined") {
    return localStorage.getItem(tokenKey);
  }
  return null;
};

export const setToken = (token: string): void => {
  if (typeof window !== "undefined")
    return localStorage.setItem(tokenKey, token);
};

export const removeToken = () => {
  if (typeof window !== "undefined") {
    localStorage.removeItem(tokenKey);
  }
};

export const isAuth = (): boolean => {
  return Boolean(getToken());
};
