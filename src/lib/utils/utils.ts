import { UUID } from 'uuidjs';
import { privateClient } from './client';

export const getDeviceId = () => {
  let uuid = localStorage.getItem('uuid');
  if (!uuid) {
    uuid = UUID.genV6().toString();
    localStorage.setItem('uuid', uuid);
  }
  return uuid;
};

export const redirectToRedirectBackURL = async () => {
  const urlParams = new URLSearchParams(window.location.search);
  const redirectBackURL = urlParams.get('redirect_back_url');

  // 获取code并跳转
  const { passportCode } = await privateClient.sharedCreateSessionLaiweiPassportCode({});

  if (passportCode && !redirectBackURL) {
    localStorage.setItem('isLoginedInPassport', 'true');
    window.location.reload();
  } else if (redirectBackURL && passportCode) {
    // 添加 passportCode 到重定向URL
    const redirectURLWithCode = new URL(redirectBackURL);
    redirectURLWithCode.searchParams.set('passport_code', passportCode);
    window.location.href = redirectURLWithCode.toString();
  }
};

export const formatPhone = (phone: string | undefined) => {
  if (!phone) return '';
  // 去掉+86前缀
  const cleanPhone = phone.replace(/^\+86 /, '');
  // 只显示前三位和后四位，中间用****代替
  const phoneNumberSplit = cleanPhone.split(' ');
  if (phoneNumberSplit.length === 3) {
    return `${phoneNumberSplit[0]}****${phoneNumberSplit[2]}`;
  }
  return cleanPhone;
};

export const isWeChatBrowser = () => {
  const userAgent = navigator.userAgent.toLowerCase();
  return userAgent.indexOf('micromessenger') !== -1;
};

export const getIsDev = () => {
  let envVersion = 'production';
  if (window.location.host === 'fe.dev.laiwei.tech' || window.location.host === 'localhost:7007') {
    envVersion = 'develop';
  }
  return envVersion;
};

export const getAppId = () => {
  // 先尝试从 URL 参数获取 appId
  const urlParams = new URLSearchParams(window.location.search);
  const urlAppId = urlParams.get('app_id');
  if (urlAppId) {
    return urlAppId;
  }

  // 如果 URL 中没有 appId，则使用默认逻辑
  const isDev = getIsDev();
  if (isDev === 'develop') {
    return 'wxa38adb8ac1910b11';
  }
  return 'wxdd953231cca7f46e';
};
