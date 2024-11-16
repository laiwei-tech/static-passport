import { UUID } from "uuidjs";

export const getDeviceId = () => {
  let uuid = localStorage.getItem("uuid");
  if (!uuid) {
    uuid = UUID.genV6().toString();
    localStorage.setItem("uuid", uuid);
  }
  return uuid;
};

export const redirectToRedirectBackURL = () => {
  const urlParams = new URLSearchParams(window.location.search);
  const redirectBackURL = urlParams.get('redirect_back_url');

  if (redirectBackURL) {
    window.location.href = redirectBackURL;
  } else {
    window.location.href = 'https://laiwei.tech/homepage/';
  }
}