import classNames from 'classnames';
import LoginLogoIcon from '@/assets/logo-light.svg';
import LoginBackground from '@/assets/login-background.png';
import { Tabs, TabsProps } from 'antd';
import './page.less';
import { AccountForm } from './component/account-form';
import { isWeChatBrowser } from '@/lib/utils/utils';
import { UserInfo } from "./component/user-info";
import { useLogin } from './hooks/useLoginPage';

function Login() {
  const {
    isLogined,
    userInfo,
    loginMode,
    shouldBindPhone,
    setLoginMode,
    handleRefresh
  } = useLogin();

  const items: TabsProps['items'] = [
    ...(!isWeChatBrowser() ? [{
      key: 'wechat',
      label: '微信登录',
      children: <div id="login-wechat-qrcode" className="flex justify-center"></div>,
    }] : []),
    {
      key: 'phone',
      label: '账号登录',
      children: <AccountForm isBind={shouldBindPhone} />,
    },
  ];

  const getBoxHeight = () => {
    if (isLogined) {
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
            'w-[380px] overflow-hidden rounded-[10px] bg-white transition-all duration-300',
            getBoxHeight(),
          )}
        >
          {isLogined ? <UserInfo userInfo={userInfo} refresh={handleRefresh} /> : <Tabs
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
