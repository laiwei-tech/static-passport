import { useEffect, useState } from 'react';
import classNames from 'classnames';
import LoginLogoIcon from '@/assets/logo-light.svg';
import LoginBackground from '@/assets/login-background.png';
import { App, Tabs, TabsProps } from 'antd';
import './page.less';
import { AccountForm } from './component/account-form';
import { useGetQrcode, useLoginByWechatCode } from '@/lib/hooks/api/login';
import useMessageEventListener from '@/lib/hooks/use-message-event-listener';
import { redirectToRedirectBackURL } from '@/lib/utils/utils';
import { useUserLoginInfo } from "@/lib/hooks/user-login-info";
import { UserInfo } from "./component/user-info";

interface Result {
  code: string;
  state: string;
}

function Login() {
  const { message: antMessage } = App.useApp();
  useGetQrcode();
  const { isLogined, userInfo } = useUserLoginInfo();
  const loginByWechatCodeMutation = useLoginByWechatCode();

  const [loading, setLoading] = useState(false);
  const [loginMode, setLoginMode] = useState('wechat');
  const message = useMessageEventListener();
  const [qrcodeResult, setQrcodeResult] = useState<Result>({
    code: '',
    state: '',
  });
  // 需要绑定手机号
  const [shouldBindPhone, setShouldBindPhone] = useState(false);

  // 二维码登录获取message
  useEffect(() => {
    if (message) {
      setQrcodeResult(message);
    }
  }, [message]);

  // 监听到二维码登录的code，调用登录接口
  useEffect(() => {
    if (qrcodeResult.code) {
      handleLoginByWechatCode();
    }
  }, [qrcodeResult]);

  const handleLoginByWechatCode = async () => {
    if (loading) {
      return;
    }
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

  const items: TabsProps['items'] = [
    {
      key: 'wechat',
      label: '微信登录',
      children: (
        <>
          {!qrcodeResult.code && (
            <div id="login-wechat-qrcode" className="flex justify-center"></div>
          )}
        </>
      ),
    },
    {
      key: 'phone',
      label: '账号登录',
      children: <AccountForm isBind={shouldBindPhone} />,
    },
  ];

  return (
    <div className="relative flex h-screen w-screen select-none items-center justify-center overflow-hidden bg-black">
      <div className="flex justify-center items-center absolute top-0 h-full">
        <img
          className="transform flex-shrink-0 animate-ping-slow origin-center"
          src={LoginBackground}
          alt=""
        />
      </div>
      <div
        className={classNames(
          'absolute z-10 box-border min-h-[310px] w-[380px] overflow-hidden rounded-[10px] shadow-[10px_10px_30px_rgba(0,0,0,0.15)] transition-all duration-300',
        )}
      >
        <h2 className="mb-8 flex items-center justify-center text-[30px] leading-[42px]">
          <img src={LoginLogoIcon} />
        </h2>
        <div
          className={classNames(
            isLogined ? 'h-[180px]' : loginMode === 'wechat' ? 'h-[480px]' : 'h-[310px]',
            'w-[380px] overflow-hidden rounded-[10px] bg-white transition-all duration-300',
          )}
        >
          {isLogined ? <UserInfo userInfo={userInfo} /> : <Tabs
            className="login-tabs"
            items={items}
            type="card"
            onChange={loginMode => {
              setLoginMode(loginMode);
            }}
          />}
        </div>
      </div>
    </div>
  );
}

export default Login;
