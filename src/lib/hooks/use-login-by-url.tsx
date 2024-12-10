import { useEffect } from 'react';
import { useLoginByWechatCode } from '@/lib/hooks/api/login';
import { isWeChatBrowser, redirectToRedirectBackURL } from '../utils/utils';
import { message } from 'antd';
import { h5WxLogin } from '../utils/login';

interface Result {
  code: string;
  state: string;
}

function useLoginByUrl() {
  const loginByWechatCodeMutation = useLoginByWechatCode();

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const code = urlParams.get('code');
    const state = urlParams.get('state');

    if (code && state) {
      const qrcodeResult: Result = { code, state };
      loginByWechatCodeMutation.mutateAsync(qrcodeResult).then(({ user }) => {
        if (user) {
          sessionStorage.setItem('isLoginByPassport', 'true');
          redirectToRedirectBackURL();
        } else {
          message.error('登录失败');
        }
      });
    } else if (isWeChatBrowser()) {
      h5WxLogin();
    }
  }, []);
}

export default useLoginByUrl;