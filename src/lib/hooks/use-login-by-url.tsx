import { useEffect, useState } from 'react';
import { useLoginByWechatOfficialAccount } from '@/lib/hooks/api/login';
import { isWeChatBrowser } from '../utils/utils';
import { message } from 'antd';
import { h5WxLogin } from '../utils/login';
import { loginStore } from '@/pages/login/store';

interface Result {
  code: string;
  state: string;
}

function useLoginByUrl(refresh: () => void) {
  const [loading, setLoading] = useState(false);
  const { setIsWrapLoading } = loginStore();
  const loginByWechatCodeMutation = useLoginByWechatOfficialAccount();

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const code = urlParams.get('code');
    const state = urlParams.get('state');
    
    if (code && state) {
      const qrcodeResult: Result = { code, state };
      setLoading(true);
      loginByWechatCodeMutation.mutateAsync(qrcodeResult).then(({ user }) => {
        if (user) {
          sessionStorage.setItem('isLoginByPassport', 'true');
          // 删除code和state参数，保留其他参数
          urlParams.delete('code');
          urlParams.delete('state');
          const newSearch = urlParams.toString();
          const newUrl = `${window.location.pathname}${newSearch ? `?${newSearch}` : ''}${window.location.hash}`;
          window.history.replaceState({}, '', newUrl);
          refresh();
        } else {
          message.warning('请输入手机号进行账号绑定');
        }
      }).finally(() => {
        setLoading(false);
        setIsWrapLoading(false);
      });
    } else if (isWeChatBrowser() && !sessionStorage.getItem('isLoginByPassport')) {
      setLoading(true);
      h5WxLogin();
    }
  }, []);

  return { loading };
}

export default useLoginByUrl;