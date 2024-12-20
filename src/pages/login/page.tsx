import classNames from 'classnames';
import LoginLogoIcon from '@/assets/logo-light.svg';
import LoginBackground from '@/assets/login-background.png';
import { Spin, Tabs, TabsProps } from 'antd';
import './page.less';
import { AccountForm } from './component/account-form';
import { isWeChatBrowser } from '@/lib/utils/utils';
import { UserInfo } from './component/user-info';
import { useLogin } from './hooks/use-login-page';
import { useMemo } from 'react';
import { LoginResult } from './component/login-result';

function Login() {
  const {
    action,
    isWrapLoading,
    isLogined,
    userInfo,
    loginMode,
    shouldBindPhone,
    setLoginMode,
    handleRefresh,
  } = useLogin();

  const items: TabsProps['items'] = [
    ...((!isWeChatBrowser() && !shouldBindPhone)
      ? [
          {
            key: 'wechat',
            label: '微信登录',
            children: <div id="login-wechat-qrcode" className="flex justify-center"></div>,
          },
        ]
      : []),
    {
      key: 'phone',
      label: (shouldBindPhone || action === 'bind') ? '绑定手机' : '账号登录',
      children: <AccountForm isBind={shouldBindPhone} />,
    },
  ];

  const getBoxHeight = () => {
    if (isLogined) {
      if (action === 'bind') {
        return 'h-[220px]';
      }
      return 'h-[180px]';
    }
    if (loginMode === 'wechat' && isWeChatBrowser()) {
      return 'h-[240px]';
    }
    if (loginMode === 'wechat') {
      return 'h-[480px]';
    }
    return 'h-[310px]';
  };

  const loginContent = useMemo(() => {
    if (isLogined) {
      if (action === 'bind') {
        return <LoginResult action={action} />;
      }
      return <UserInfo userInfo={userInfo} refresh={handleRefresh} />;
    } else {
      return (
        <Tabs
          className="login-tabs"
          activeKey={loginMode}
          items={items}
          type="card"
          onChange={loginMode => {
            setLoginMode(loginMode);
          }}
        />
      );
    }
  }, [isLogined, loginMode, items, setLoginMode, action]);

  return (
    <div className="relative flex h-screen w-screen select-none items-center justify-center overflow-hidden bg-black">
      <div className="absolute top-0 flex h-full items-center justify-center">
        <img
          className="flex-shrink-0 origin-center transform animate-ping-slow"
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
        <Spin spinning={isWrapLoading}>
          <div
            className={classNames(
              'w-[380px] overflow-hidden rounded-[10px] bg-white transition-all duration-300',
              getBoxHeight(),
            )}
            style={{ transition: 'all 0.3s' }}
          >
            {loginContent}
          </div>
        </Spin>
      </div>
    </div>
  );
}

export default Login;
