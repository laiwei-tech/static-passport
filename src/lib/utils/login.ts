import { Auth_Provider_Type_Enum } from "@/gen/laiweiv1/model_pb";
import { publicClient } from "./client";
import { getAppId } from "./utils";

export interface WxLoginOptions {
  self_redirect?: boolean;
  appid: string;
  scope: string;
  redirect_uri: string;
  state: string;
  styletype?: string;
  sizetype?: string;
  bgcolor?: string;
  rst?: string;
  style?: string;
  href?: string;
  lang?: string;
  id: string;
}

export function WxLogin(options: WxLoginOptions): void {
  let selfRedirect = 'default';
  if (options.self_redirect === true) {
    selfRedirect = 'true';
  } else if (options.self_redirect === false) {
    selfRedirect = 'false';
  }

  const iframe = document.createElement('iframe');
  let src = `https://open.weixin.qq.com/connect/qrconnect?appid=${options.appid}&scope=${options.scope}&redirect_uri=${options.redirect_uri}&state=${
    options.state
  }&login_type=jssdk&self_redirect=${selfRedirect}&styletype=${options.styletype || ''}&sizetype=${options.sizetype || ''}&bgcolor=${options.bgcolor || ''}&rst=${options.rst || ''}`;

  if (options.style) {
    src += `&style=${options.style}`;
  }

  if (options.href) {
    src += `&href=${options.href}`;
  }

  if (options.lang === 'en') {
    src += `&lang=en`;
  }

  iframe.src = src;
  iframe.frameBorder = '0';
//   iframe.allowTransparency = true;
  iframe.scrolling = 'no';
  iframe.width = '300px';
  iframe.height = '400px';

  const container = document.getElementById(options.id);
  if (container) {
    container.innerHTML = '';
    container.appendChild(iframe);
  } else {
    console.error(`Element with id "${options.id}" not found.`);
  }
}

export const h5WxLogin = async () => {
  const { providerResponse } = await publicClient.beforeLogin({
    providerType: Auth_Provider_Type_Enum.WECHAT_OFFICIAL_ACCOUNT,
    providerId: {
      provider: {
        case: "wechatOfficialAccount",
        value: {
          appId: getAppId(),
        },
      },
    },
    providerRequest: {
      provider: {
        case: "wechatOfficialAccount",
        value: {},
      },
    }
  })

  const appId = getAppId();
  const redirectUrl = window.location.href;
  const callbackState = providerResponse?.provider.case === "wechatOfficialAccount" ? providerResponse?.provider.value?.state : "";
  const scopeType = "snsapi_base";
  const url = `https://open.weixin.qq.com/connect/oauth2/authorize?appid=${appId}&redirect_uri=${encodeURIComponent(
    redirectUrl
  )}&response_type=code&scope=${scopeType}&state=${callbackState}#wechat_redirect`;
  window.location.href = url;
}

