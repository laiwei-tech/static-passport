// hooks/useLogin.ts
import { useEffect, useState } from 'react';
import { App } from 'antd';
import { useGetQrcode, useLoginByWechatCode } from '@/lib/hooks/api/login';
import useMessageEventListener from '@/lib/hooks/use-message-event-listener';
import { isWeChatBrowser, redirectToRedirectBackURL } from '@/lib/utils/utils';
import { useUserLoginInfo } from "@/lib/hooks/user-login-info";
import useLoginByUrl from '@/lib/hooks/use-login-by-url';

interface Result {
  code: string;
  state: string;
}

export function useLogin() {
  useLoginByUrl();
  const { message: antMessage } = App.useApp();
  const { refetch: refreshQrcodeInfo } = useGetQrcode();
  const { isLogined, userInfo, refresh: refreshUserInfo } = useUserLoginInfo();
  const loginByWechatCodeMutation = useLoginByWechatCode();

  const [loading, setLoading] = useState(false);
  const [loginMode, setLoginMode] = useState('wechat');
  const message = useMessageEventListener();
  const [qrcodeResult, setQrcodeResult] = useState<Result>({
    code: '',
    state: '',
  });
  const [shouldBindPhone, setShouldBindPhone] = useState(false);

  useEffect(() => {
    if (message) {
      setQrcodeResult(message);
    }
  }, [message]);

  useEffect(() => {
    if (qrcodeResult.code) {
      handleLoginByWechatCode();
    }
  }, [qrcodeResult]);

  useEffect(() => {
    if (isWeChatBrowser()) {
      setLoginMode('phone');
    }
  }, []);

  const handleLoginByWechatCode = async () => {
    if (loading) return;
    
    setLoading(true);
    const { user } = await loginByWechatCodeMutation.mutateAsync(qrcodeResult);
    
    if (user) {
      sessionStorage.setItem('isLoginByPassport', 'true');
      redirectToRedirectBackURL();
    } else {
      setShouldBindPhone(true);
      setLoginMode('phone');
      antMessage.info('请绑定手机号');
    }
  };

  const handleRefresh = () => {
    refreshUserInfo();
    refreshQrcodeInfo();
  };

  return {
    isLogined,
    userInfo,
    loginMode,
    shouldBindPhone,
    setLoginMode,
    handleRefresh,
  };
}