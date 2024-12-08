import { UUID } from "uuidjs";
import { privateClient } from "./client";

export const getDeviceId = () => {
  let uuid = localStorage.getItem("uuid");
  if (!uuid) {
    uuid = UUID.genV6().toString();
    localStorage.setItem("uuid", uuid);
  }
  return uuid;
};

export const redirectToRedirectBackURL = async () => {
  const urlParams = new URLSearchParams(window.location.search);
  const redirectBackURL = urlParams.get('redirect_back_url');

  // 获取code并跳转
  const { passportCode } = await privateClient.sharedCreateSessionLaiweiPassportCode({});

  if (redirectBackURL && passportCode) {
    localStorage.setItem('isLoginedInPassport', 'true');
    // 添加 passportCode 到重定向URL
    const redirectURLWithCode = new URL(redirectBackURL);
    redirectURLWithCode.searchParams.set('passport_code', passportCode);
    window.location.href = redirectURLWithCode.toString();
  }
}

export const formatPhone = (phone: string | undefined) => {
  if (!phone) return '';
  // 去掉+86前缀
  const cleanPhone = phone.replace(/^\+86 /, '');
  // 只显示前三位和后四位，中间用****代替
  const phoneNumberSplit = cleanPhone.split(' ');
  console.log(phoneNumberSplit);
  if (phoneNumberSplit.length === 3) {
    return `${phoneNumberSplit[0]}****${phoneNumberSplit[2]}`;
  }
  return cleanPhone;
};