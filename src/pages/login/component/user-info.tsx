import { User } from '@/gen/laiweiv1/model_pb';
import { privateClient } from '@/lib/utils/client';
import { formatPhone, redirectToRedirectBackURL } from '@/lib/utils/utils';
import { Avatar, Button, message } from 'antd';
import { useState } from 'react';

export const UserInfo = ({ userInfo, refresh }: { userInfo: User | null; refresh: () => void }) => {
  const urlParams = new URLSearchParams(window.location.search);
  const redirectBackURL = urlParams.get('redirect_back_url');
  const [loading, setLoading] = useState(false);

  const handleLogin = () => {
    redirectToRedirectBackURL();
  };

  const handleLogout = () => {
    setLoading(true);
    sessionStorage.removeItem('isLoginByPassport');
    privateClient
      .sharedLogOut({})
      .then(() => {
        message.success('退出成功');
        refresh();
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <div className="p-4">
      <div className="mb-2 text-sm font-semibold">登录信息</div>
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Avatar className="h-10 w-10" src={userInfo?.avatar?.url} />
          <div>
            <div className="text-base font-semibold">{userInfo?.nickname}</div>
            <div className="text-sm text-gray-500">{formatPhone(userInfo?.phone)}</div>
          </div>
        </div>
        <div>
          <Button loading={loading} type="text" onClick={handleLogout} className="px-1">
            退出
          </Button>
        </div>
      </div>
      <Button
        disabled={!redirectBackURL}
        onClick={handleLogin}
        type="primary"
        size="large"
        className="mt-6 w-full rounded-lg"
      >
        一键登录
      </Button>
    </div>
  );
};
