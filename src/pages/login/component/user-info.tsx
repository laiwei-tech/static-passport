import { User } from "@/gen/laiweiv1/model_pb";
import { formatPhone, redirectToRedirectBackURL } from "@/lib/utils/utils";
import { Avatar, Button } from "antd";

export const UserInfo = ({ userInfo }: { userInfo: User | null }) => {
  const urlParams = new URLSearchParams(window.location.search);
  const redirectBackURL = urlParams.get('redirect_back_url');

  const handleLogin = () => {
    redirectToRedirectBackURL();
  };

  return <div className="p-4">
    <div className="text-sm font-semibold mb-2">登录信息</div>
    <div className="flex items-center gap-2">
      <Avatar className="w-10 h-10" src={userInfo?.avatar?.url} />
      <div>
        <div className="text-base font-semibold">{userInfo?.nickname}</div>
        <div className="text-sm text-gray-500">{formatPhone(userInfo?.phone)}</div>
      </div>
    </div>
    <Button disabled={!redirectBackURL} onClick={handleLogin} type="primary" size="large" className="w-full mt-6 rounded-lg">一键登录</Button>
  </div>;
};
