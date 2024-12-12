import { Result } from "antd";

export const LoginResult = ({ action }: { action: string }) => {
  return <div>
    <Result
      status="success"
      title={action === 'bind' ? '绑定手机号成功' : '登录成功'}
    />
  </div>;
};
