export const isDev = () => {
  if (
    window.location.host === "fe.dev.laiwei.tech" ||
    window.location.host.indexOf("localhost") !== -1
  ) {
    return true;
  }
  return false;
};

export const getBaseUrl = () => {
  if (isDev()) {
    return "https://api.dev.laiwei.tech";
  } else {
    return "https://api.laiwei.tech";
  }
};
