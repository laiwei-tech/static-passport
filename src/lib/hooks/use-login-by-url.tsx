import { useEffect } from 'react';
import { useLoginByWechatOfficialAccount } from '@/lib/hooks/api/login';
import { isWeChatBrowser } from '../utils/utils';
import { message } from 'antd';
import { h5WxLogin } from '../utils/login';

interface Result {
  code: string;
  state: string;
}

function useLoginByUrl() {
  const loginByWechatCodeMutation = useLoginByWechatOfficialAccount();

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const code = urlParams.get('code');
    const state = urlParams.get('state');

    if (code && state) {
      const qrcodeResult: Result = { code, state };
      loginByWechatCodeMutation.mutateAsync(qrcodeResult).then(({ user }) => {
        if (user) {
          sessionStorage.setItem('isLoginByPassport', 'true');
          // 删除code和state参数，保留其他参数
          urlParams.delete('code');
          urlParams.delete('state');
          const newSearch = urlParams.toString();
          const newUrl = `${window.location.pathname}${newSearch ? `?${newSearch}` : ''}${window.location.hash}`;
          window.history.replaceState({}, '', newUrl);
        } else {
          message.error('登录失败');
        }
      });
    } else if (isWeChatBrowser() && !sessionStorage.getItem('isLoginByPassport')) {
      h5WxLogin();
    }
  }, []);
}

export default useLoginByUrl;