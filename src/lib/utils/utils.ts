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
  const redirectBackURL = urlParams.get('redirect_back_url') || sessionStorage.getItem('redirect_back_url');

  if (redirectBackURL) {
    window.location.href = redirectBackURL;
    sessionStorage.removeItem('redirect_back_url');
  } else {
    window.location.href = 'https://laiwei.tech/homepage/';
  }
}

export const storageRedirectBackURL = () => {
  const urlParams = new URLSearchParams(window.location.search);
  const redirectBackURL = urlParams.get('redirect_back_url');

  if (redirectBackURL) {
    sessionStorage.setItem('redirect_back_url', redirectBackURL);
  }
}