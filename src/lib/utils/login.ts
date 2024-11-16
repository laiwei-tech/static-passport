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
